import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import Search from "../screens/Search";
import Orders from "../screens/Orders";
import Profile from "../screens/Profile";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { CartContext } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme/theme";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
	const { items } = useContext(CartContext);

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: theme.colors.accent,
				tabBarInactiveTintColor: theme.colors.subtle,
				tabBarStyle: {
					backgroundColor: theme.colors.surface,
					borderTopColor: theme.colors.border,
					height: 68,
					paddingBottom: 10,
					paddingTop: 8,
				},
				tabBarLabelStyle: { fontSize: 11, fontWeight: "700" },
				tabBarItemStyle: { paddingTop: 3 },
				tabBarIcon: ({ color, size }) => {
					let name: any = "home";
					if (route.name === "HomeTab") name = "home";
					if (route.name === "Search") name = "search";
					if (route.name === "Orders") name = "receipt";
					if (route.name === "Profile") name = "person";
					return (
						<Ionicons
							name={name}
							size={size}
							color={color}
						/>
					);
				},
			})}
		>
			<Tab.Screen
				name="HomeTab"
				component={HomeStack}
				options={({ route }) => {
					const routeName = route.state?.routes[route.state.index]?.name;
					const hide = routeName === "RestaurantDetail" || routeName === "Cart";
					return {
						title: "Home",
						tabBarStyle: hide ? { display: "none" } : undefined,
					};
				}}
			/>
			<Tab.Screen
				name="Search"
				component={Search}
			/>
			<Tab.Screen
				name="Orders"
				component={Orders}
				options={{
					tabBarBadge: items.length ? items.length : undefined,
					tabBarBadgeStyle: {
						backgroundColor: theme.colors.accent,
						color: theme.colors.background,
						fontWeight: "800",
					},
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
			/>
		</Tab.Navigator>
	);
}

export default function MainDrawer() {
	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				drawerStyle: {
					backgroundColor: theme.colors.background,
				},
				drawerActiveTintColor: theme.colors.accent,
				drawerInactiveTintColor: theme.colors.text,
				drawerLabelStyle: { fontWeight: "700" },
				drawerType: "slide",
			}}
		>
			<Drawer.Screen
				name="AppTabs"
				component={Tabs}
				options={{ headerShown: false }}
			/>
		</Drawer.Navigator>
	);
}
