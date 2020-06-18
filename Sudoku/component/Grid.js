import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Alert,
} from 'react-native';

import {
    CellSize,
    BorderWidth,
    CellTextSize,
    Color,
} from './GlobalStyle';

//import Cell from './CellOld';

const stack = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: null,
        }
        this.onPress = this.onPress.bind(this);
        this.setNumber = this.setNumber.bind(this);
    }

    setNumber(input) {
        this.setState({ number: input })
    }

    onPress() {
        this.props.onPress && this.props.onPress(this.props.index, this.state.number);
        //this.setState({number: input});
        Alert.alert(String(this.props.index) + '\n' + String(this.state.number));
    }

    render() {
        const number = this.state.number;
        const text = (number === null)? '': (number+1);
        return (
            <TouchableOpacity
                style={styles.cellTouchInput}
                onPress={this.onPress}
            >
                <Text style={styles.cellText}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

class Grid extends Component {
    cells = [];
    state = {
        index: -0,
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState != this.state) {
            return true;
        }
        return false;
    }

    onTouch (index, number) {
        this.cells[index].setNumber(number);
    }

    render() {
        return (
            <View style={styles.container} >
                {
                    stack.map((item, i) => {
                        return (
                            <View key={'grid' + i} style={styles.grid} >
                                {
                                    stack.map((item, j) => {
                                        const x = i % 3 * 3 + j % 3;
                                        const y = Math.floor(i / 3) * 3 + Math.floor(j / 3);
                                        const index = x + y * 9;
                                        return <Cell ref={ref => this.cells[index] = ref} key={'cell' + index}
                                            index={index} number={null} onPress={this.props.onPress} />
                                    })
                                }
                            </View>
                        )
                    })
                }
                <View style={styles.cellTouchInput}>
                    <TouchableOpacity onPress={this.onTouch}><Text>Click me</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: CellSize * 9 + BorderWidth * 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'black',
    },
    grid: {
        margin: BorderWidth,
        width: CellSize * 3,
        height: CellSize * 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cellTouchInput: {
        height: CellSize,
        width: CellSize,
        fontSize: CellTextSize,
        borderWidth: 1,
        backgroundColor: Color.LightGreen,
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
});

export default Grid;