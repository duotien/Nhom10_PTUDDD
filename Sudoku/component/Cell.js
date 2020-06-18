import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    CellSize,
    BorderWidth,
} from './GlobalStyle';

// Sudoku = require('sudoku');
import * as Sudoku from 'sudoku';
var _ = require('lodash');
var puzzle;
//import SudokuGrid from 'react-native-smart-sudoku-grid';

//this is a single Cell in a Sudoku board

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: this.props.number,
            hints: [],
            editing: false,
            highlight: false,
            fixed: false,
            toggle: false,
        }

    }
    


    render () {
        return (
            <View >
                <TouchableOpacity style={styles.cell}>
                    <Text style={styles.cellText}>{this.props.value}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default class Main extends Component {
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Sudoku</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.rows}>
                        <Cell value='1'></Cell>
                        <Cell value='2' />
                        <Cell value='3' />
                        <Cell value='4' />
                        <Cell value='5' />
                        <Cell value='6' />
                        <Cell value='7' />
                        <Cell value='8' />
                        <Cell value='9' />
                    </View>
                    <View style={styles.rows}>
                        <Cell value='1'></Cell>
                        <Cell value='2' />
                        <Cell value='3' />
                        <Cell value='4' />
                        <Cell value='5' />
                        <Cell value='6' />
                        <Cell value='7' />
                        <Cell value='8' />
                        <Cell value='9' />
                    </View>
                    <View style={styles.rows}>
                        <Cell value='1'></Cell>
                        <Cell value='2' />
                        <Cell value='3' />
                        <Cell value='4' />
                        <Cell value='5' />
                        <Cell value='6' />
                        <Cell value='7' />
                        <Cell value='8' />
                        <Cell value='9' />
                    </View>
                    <View style={styles.rows}>
                        <Cell value='1'></Cell>
                        <Cell value='2' />
                        <Cell value='3' />
                        <Cell value='4' />
                        <Cell value='5' />
                        <Cell value='6' />
                        <Cell value='7' />
                        <Cell value='8' />
                        <Cell value='9' />
                    </View>
                    <View style={styles.rows}>
                        <Cell value='1'></Cell>
                        <Cell value='2' />
                        <Cell value='3' />
                        <Cell value='4' />
                        <Cell value='5' />
                        <Cell value='6' />
                        <Cell value='7' />
                        <Cell value='8' />
                        <Cell value='9' />
                    </View>
                    <View style={styles.rows}>
                        <Cell value='1'></Cell>
                        <Cell value='2' />
                        <Cell value='3' />
                        <Cell value='4' />
                        <Cell value='5' />
                        <Cell value='6' />
                        <Cell value='7' />
                        <Cell value='8' />
                        <Cell value='9' />
                    </View>
                    <View style={styles.rows}>
                        <Cell value='1'></Cell>
                        <Cell value='2' />
                        <Cell value='3' />
                        <Cell value='4' />
                        <Cell value='5' />
                        <Cell value='6' />
                        <Cell value='7' />
                        <Cell value='8' />
                        <Cell value='9' />
                    </View>
                    <View style={styles.rows}>
                        <Cell value='1'></Cell>
                        <Cell value='2' />
                        <Cell value='3' />
                        <Cell value='4' />
                        <Cell value='5' />
                        <Cell value='6' />
                        <Cell value='7' />
                        <Cell value='8' />
                        <Cell value='9' />
                    </View>
                    <View style={styles.rows}>
                        <Cell value='1'></Cell>
                        <Cell value='2' />
                        <Cell value='3' />
                        <Cell value='4' />
                        <Cell value='5' />
                        <Cell value='6' />
                        <Cell value='7' />
                        <Cell value='8' />
                        <Cell value='9' />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: 'powderblue',
        marginLeft: 20,
        marginRight: 20,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 24,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        justifyContent: 'center',
        width: CellSize * 9 + BorderWidth * 6,
        //borderWidth: 1,
    },
    cell: {
        width: CellSize,
        height: CellSize,
        backgroundColor: 'red',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    cellText: {
        fontSize: CellSize * 2 / 3,
    },
    rows: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});