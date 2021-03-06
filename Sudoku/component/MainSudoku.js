import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    PixelRatio,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    BoardWidth,
    CellSize,
    BorderWidth,
    CellTextSize,
    Color,
} from './GlobalStyle';
import Sudoku from 'sudoku';

const difficultyrate = 5;
var _ = require('lodash');
var userpuzzle, fixedpuzzle, solvedpuzzle;
fixedpuzzle = Sudoku.makepuzzle();
solvedpuzzle = Sudoku.solvepuzzle(fixedpuzzle);

class NumberControl extends Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.onPress && this.props.onPress(this.props.number);
    }

    render() {
        return (
            <TouchableOpacity style={styles.numberControl} onPress={this.onPress}>
                <Text style={styles.numberControlText}>{this.props.number}</Text>
            </TouchableOpacity>
        );
    }
}

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            puzzle: fixedpuzzle,
            difficulty: Sudoku.ratepuzzle(fixedpuzzle, difficultyrate),
            selectednum: null,
        }
        this.onInput = this.onInput.bind(this);
        this.getInput = this.getInput.bind(this);
        this.newGame = this.newGame.bind(this);
        this.solvePuzzle = this.solvePuzzle.bind(this);
        this.generateBoard = this.generateBoard.bind(this);
        this.boardMatches = this.boardMatches.bind(this);
        this.displayUserInput = this.displayUserInput.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.deleteInput = this.deleteInput.bind(this);
    }

    onInput(key, input) {
        let gridpoint = key.split('-');
        let x = gridpoint[0];
        let y = gridpoint[1];
        userpuzzle[x][y] = parseInt(input);
        this.setState({ puzzle: _.flatten(userpuzzle) });
        if (this.boardMatches(_.flatten(userpuzzle), solvedpuzzle)) {
            Alert.alert('Congratulation!!!', 'You have solved the puzzle');
        }
    }

    getInput(input) {
        this.setState({ selectednum: parseInt(--input) });
    }

    deleteInput() {
        this.setState({ selectednum: null });
    }

    resetBoard() {
        this.setState({ puzzle: fixedpuzzle });
        userpuzzle = null;
    }

    displayUserInput(key) {
        let gridpoint = key.split('-');
        let x = gridpoint[0];
        let y = gridpoint[1];
        let number = userpuzzle[x][y];
        return (number === null || isNaN(number)) ? '' : (number + 1);
    }

    boardMatches(b1, b2) {
        for (var i = 0; i < 81; i++) {
            if (b1[i] != b2[i]) {
                return false;
            }
        }
        return true;
    }

    newGame() {
        fixedpuzzle = Sudoku.makepuzzle();
        this.setState({ puzzle: fixedpuzzle, difficulty: Sudoku.ratepuzzle(fixedpuzzle, difficultyrate) });
        solvedpuzzle = Sudoku.solvepuzzle(fixedpuzzle);
    }

    solvePuzzle() {
        solvedpuzzle = Sudoku.solvepuzzle(fixedpuzzle);
        this.setState({ puzzle: solvedpuzzle });
    }

    renderNumberControl() {
        const value = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let numbercontrol = [];
        value.map((key) => {
            numbercontrol.push(
                <NumberControl key={key} number={++key} onPress={this.getInput} ></NumberControl>
            );
        });
        return (
            <View style={styles.row}>{numbercontrol}</View>
        );
    }

    generateBoard() {
        let rows = [];
        let blocks = [];
        let inputcells = _.chunk(fixedpuzzle, 9);
        userpuzzle = _.chunk(this.state.puzzle, 9);

        inputcells.map((row) => {
            let rowSeperator = ((rows.length == 2 || rows.length == 5)) ? true : false;

            row.map((block) => {
                let key = rows.length + '-' + blocks.length;
                let cellSeperator = ((blocks.length == 2 || blocks.length == 5)) ? true : false;
                //block is a cell
                //cell === null => return a userinput number
                if (block === null) {
                    blocks.push(
                        <View key={key} style={[styles.cell, cellSeperator && styles.cellSeperator]}>
                            <TouchableOpacity
                                style={styles.cellTouchInput}
                                onPress={() => this.onInput(key, this.state.selectednum)}
                            >
                                <Text style={styles.cellText}>{this.displayUserInput(key)}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }
                //cell != null, return the prefilled number 
                else {
                    blocks.push(
                        <View key={key} style={[styles.cell, cellSeperator && styles.cellSeperator]}>
                            <Text style={styles.cellText}>{++block}</Text>
                        </View>
                    );
                }
            });
            rows.push(<View key={rows.length} style={[styles.row, rowSeperator && styles.rowSeperator]}>{blocks}</View>);
            blocks = [];
        });
        return (
            <View>
                <View key={rows.length} style={styles.container}>{rows}</View>
            </View>
        );
    }

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.solvePuzzle}><Text>Solve Puzzle</Text></TouchableOpacity>
                    <Text style={styles.headerText}>Sudoku</Text>
                    <TouchableOpacity onPress={this.newGame}><Text>New Game</Text></TouchableOpacity>
                </View>

                <View style={styles.container}>
                    {this.generateBoard()}
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerRow}>
                        {this.renderNumberControl()}
                    </View>
                    <View style={styles.footerRow}>
                        <TouchableOpacity style={styles.button} onPress={this.resetBoard}>
                            <Text style={styles.cellText}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.deleteInput}>
                            <Text style={styles.cellText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        marginBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
    },
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        width: CellSize * 9,
        borderWidth: 3,
        borderTopWidth: 2,
        borderBottomWidth: 2,
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        paddingLeft: 25,
        paddingRight: 25,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowSeperator: {
        borderBottomWidth: 2,
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1 / PixelRatio.get(),
        height: CellSize, //40
    },
    cellTextInput: {
        paddingBottom: 2,
        paddingLeft: 10,
        height: CellSize,
        fontSize: CellTextSize,
        backgroundColor: 'rgba(0, 255, 0, .1)',
    },
    cellTouchInput: {
        height: CellSize,
        fontSize: CellTextSize,
        backgroundColor: 'rgba(0, 255, 0, .25)',
    },
    cellSeperator: {
        borderRightWidth: 2,
    },
    cellText: {
        fontSize: CellTextSize,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    numberControl: {
        justifyContent: 'center',
        alignItems: 'center',
        width: CellSize,
        height: CellSize,
        backgroundColor: Color.DarkGreen,
        borderWidth: 1,
    },
    numberControlText: {
        fontSize: CellTextSize,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    button: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        height: CellSize,
        backgroundColor: Color.LightGreen,
        borderWidth: 1,
    },
});