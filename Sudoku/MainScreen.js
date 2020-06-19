// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from 'react';
import { View, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MainSudoku from './component/MainSudoku';

const abouttext = 'Sudoku project by Group 10\nMember:\n1.Dương Tiến\n44.01.104.193\n\n2.Trần Gia Phát\n44.01.104.165\n\n3.Nguyễn Trần Linh Ân\n42.01.104.011';

function HomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.parent}>SUDOKU</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.buttonPlay} onPress={() => navigation.navigate('Game')}>
					<Text style={styles.buttonText}>PLAY</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.buttonAbout} onPress={() => Alert.alert('About',abouttext)}>
					<Text style={styles.buttonText}>ABOUT</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
function GameScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<MainSudoku></MainSudoku>
		</View>
	)
}

function SettingsScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Settings!</Text>
		</View>
	)
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name="Home" component={HomeScreen} />
		</HomeStack.Navigator>
	);
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
	return (
		<SettingsStack.Navigator>
			<SettingsStack.Screen name="Settings" component={SettingsScreen} />
		</SettingsStack.Navigator>
	);
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={HomeStackScreen} />
			<Tab.Screen name="Settings" component={SettingsStackScreen} />
		</Tab.Navigator>
	);
}

const RootStack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<RootStack.Navigator>
				<RootStack.Screen name="Home" component={HomeTabs} />
				<RootStack.Screen name="Game" component={GameScreen} />
			</RootStack.Navigator>

		</NavigationContainer>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	parent: {
		color: 'black',
		fontSize: 50,
		fontWeight: 'bold',
	},
	buttonContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	buttonPlay: {
		backgroundColor: 'black',
		borderRadius: 6,
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
	buttonAbout: {
		backgroundColor: '#00cc00',
		borderRadius: 6,
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
	buttonText: {
		color: 'white',
		fontSize: 20,
		width: 200,
		textAlign: 'center',
		textAlignVertical: 'center',
		height: 50,
	}
})