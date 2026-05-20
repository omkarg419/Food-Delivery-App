import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Login";
import MainDrawer from "./MainTabs";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { theme } from "../theme/theme";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
	const { userToken } = useContext(AuthContext);

	if (userToken === undefined) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator color={theme.colors.accent} />
			</View>
		);
	}

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{/* Onboarding shown once — for simplicity always show before auth in this scaffold */}
			<Stack.Screen
				name="Onboarding"
				component={Onboarding}
			/>
			{userToken == null ? (
				<Stack.Screen
					name="Auth"
					component={Login}
				/>
			) : (
				<Stack.Screen
					name="Main"
					component={MainDrawer}
				/>
			)}
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: theme.colors.background,
	},
});
