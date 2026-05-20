import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import RestaurantDetail from "../screens/RestaurantDetail";
import Cart from "../screens/Cart";
import { theme } from "../theme/theme";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: theme.colors.surface },
				headerTintColor: theme.colors.text,
				headerTitleStyle: { fontWeight: "800" },
				headerShadowVisible: false,
				contentStyle: { backgroundColor: theme.colors.background },
			}}
		>
			<Stack.Screen
				name="RestaurantList"
				component={Home}
				options={{ title: "Restaurants" }}
			/>
			<Stack.Screen
				name="RestaurantDetail"
				component={RestaurantDetail}
				options={({ route }) => ({
					title: route.params?.name ?? "Detail",
					headerBackTitle: "Back",
					headerStyle: { backgroundColor: theme.colors.surface },
				})}
			/>
			<Stack.Screen
				name="Cart"
				component={Cart}
				options={{
					title: "Your Cart",
					headerStyle: { backgroundColor: theme.colors.surface },
				}}
			/>
		</Stack.Navigator>
	);
}
