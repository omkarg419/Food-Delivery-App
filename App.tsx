import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./src/navigatore/RootNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
	return (
		<AuthProvider>
			<CartProvider>
				<NavigationContainer
					linking={{
						prefixes: ["foodapp://"],
						config: {
							screens: {
								Main: {
									screens: {
										HomeTab: {
											screens: {
												RestaurantDetail: "restaurant/:id",
											},
										},
									},
								},
							},
						},
					}}
				>
					<RootNavigator />
					<StatusBar style="light" />
				</NavigationContainer>
			</CartProvider>
		</AuthProvider>
	);
}
