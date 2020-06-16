import React, { Component, Dimensions } from 'react';
import {
    Alert,
    StyleSheet,
    PixelRatio,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
    Button,
} from 'react-native';

import {
    CellSize,
    BorderWidth,
    CellTextSize,
    Color,
} from './component/GlobalStyle';

// Sudoku = require('sudoku');
import * as Sudoku from 'sudoku';
var _ = require('lodash');
var puzzle;
//import SudokuGrid from 'react-native-smart-sudoku-grid';

//this is a single Cell in a Sudoku board
class Cell extends Component {
    render() {
        return (
            <View style={styles.cell}>
                <TouchableOpacity>
                    
                </TouchableOpacity>
            </View>
        );
    }
}

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            puzzle: Sudoku.makepuzzle()
        }
        this._onInput = this._onInput.bind(this);
        this.newGame = this.newGame.bind(this);
        this.solvePuzzle = this.solvePuzzle.bind(this);
        this.generateBoard = this.generateBoard.bind(this);
        this.boardMatches = this.boardMatches.bind(this);
        //console.log(_.chunk(this.state.puzzle,9));
    }

    _onInput(key, input) {
        var solved = Sudoku.solvepuzzle(_.flatten(this.state.puzzle));
        var gridpoint = key.split('-');
        var x = gridpoint[0];
        var y = gridpoint[1];
        puzzle[x][y] = parseInt(--input);

        Alert.alert('You pressed a cell');

        if (this.boardMatches(_.flatten(puzzle), solved)) {
            Alert.alert('Game Solved');
        }
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
        this.setState({ puzzle: Sudoku.makepuzzle() });
    }

    solvePuzzle() {
        var solved = Sudoku.solvepuzzle(_.flatten(this.state.puzzle));
        this.setState({ puzzle: solved });
    }

    
    generateBoard() {
        var rows = [];
        var blocks = [];
        puzzle = _.chunk(this.state.puzzle, 9);

        puzzle.map((row) => {
            var rowSeperator = ((rows.length == 2 || rows.length == 5)) ? true : false;

            row.map((block) => {
                var key = rows.length + '-' + blocks.length;
                var cellSeperator = ((blocks.length == 2 || blocks.length == 5)) ? true : false;

                //block is a cell
                //cell === null => return a userinput number
                if (block === null) {
                    blocks.push(
                        /*
                        <View key={key} style={[styles.cell, blockSeperator && styles.cellSeperator]}>
                            <TextInput
                                clearTextOnFocus={true}
                                keyboardType='number-pad'
                                style={styles.cellInput}
                                onChangeText={(input) => this._onInput(key, input)}
                            />
                        </View>
                        */
                       <View key={key} style={[styles.cell, cellSeperator && styles.cellSeperator]}>
                            <TouchableOpacity
                                style={styles.cellInput}
                                onPress={(input) => this._onInput(key, input)}
                            />
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
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.numberControl}>
                            <Text style={styles.numberControlText}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberControl}>
                            <Text style={styles.numberControlText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberControl}>
                            <Text style={styles.numberControlText}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberControl}>
                            <Text style={styles.numberControlText}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberControl}>
                            <Text style={styles.numberControlText}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberControl}>
                            <Text style={styles.numberControlText}>6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberControl}>
                            <Text style={styles.numberControlText}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberControl}>
                            <Text style={styles.numberControlText}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.numberControl}>
                            <Text style={styles.numberControlText}>9</Text>
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
    cellInput: {
        paddingBottom: 2,
        paddingLeft: 10,
        height: CellSize,
        fontSize: CellTextSize,
        backgroundColor: 'rgba(0, 0, 255, .1)'
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
});