import {
    StyleSheet,
    Dimensions,
} from 'react-native';

export const Size = Dimensions.get('window');

export const BoardWidth = Size.width;

export const CellSize = Math.floor(BoardWidth / 10);

export const BorderWidth = 3;

export const CellTextSize = CellSize * 2 / 3;

export const Color = {
    DarkGreen: '#31692c',
    LightGreen: '#99ff9c',
};