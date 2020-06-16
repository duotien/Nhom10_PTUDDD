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
} from 'react-native';

import {
    CellSize,
    BorderWidth,
    CellTextSize,
} from './component/GlobalStyle';

// Sudoku = require('sudoku');
import * as Sudoku from 'sudoku';
var _ = require('lodash');
var puzzle;
//import SudokuGrid from 'react-native-smart-sudoku-grid';

//this is a single Cell in a Sudoku board

class SudokuBoard extends Component {
    
    render () {
        return (
            <View>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
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
                var blockSeperator = ((blocks.length == 2 || blocks.length == 5)) ? true : false;

                //block is a cell
                //cell === null => return a userinput number
                if (block === null) {
                    blocks.push(
                        <View key={key} style={[styles.block, blockSeperator && styles.blockSeperator]}>
                            <TextInput
                                clearTextOnFocus={true}
                                keyboardType='number-pad'
                                style={styles.textInput}
                                onChangeText={(input) => this._onInput(key, input)}
                            />
                        </View>
                    );
                }
                //cell != null, return the prefilled number 
                else {
                    blocks.push(
                        <View key={key} style={[styles.block, blockSeperator && styles.blockSeperator]}>
                            <Text style={styles.blockText}>{++block}</Text>
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
            </View>

        );
    }
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        justifyContent: 'flex-start',
        borderWidth: 1 / PixelRatio.get(),
        height: 40,
    },
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
    row: {
        //flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        //marginTop: 35,
        //height: 40,
    },
    rowSeperator: {
        borderBottomWidth: 2,
    },
    textInput: {
        paddingBottom: 2,
        paddingLeft: 10,
        height: CellSize,
        fontSize: CellTextSize,
        backgroundColor: 'rgba(0, 0, 255, .1)'
    },
    block: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1 / PixelRatio.get(),
        height: CellSize, //40
    },
    blockSeperator: {
        borderRightWidth: 2,
    },
    blockText: {
        fontSize: CellTextSize,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
});