
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar barStyle="dark-content" /> 
			<Text style={styles.title}>Rural Cravings</Text>
			<Text style={styles.subtitle}>Welcome to your Customer App Mobile Application 🌾</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#f26c23', 
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
	},
});