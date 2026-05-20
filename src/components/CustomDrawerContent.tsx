import React, { useContext } from "react";
import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { theme } from "../theme/theme";

export default function CustomDrawerContent(props: any) {
	const { signOut } = useContext(AuthContext);

	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={styles.scrollContent}
			style={styles.drawer}
		>
			<View style={styles.header}>
				<Image
					source={{ uri: "https://placekitten.com/80/80" }}
					style={styles.avatar}
				/>
				<Text style={styles.name}>Demo User</Text>
				<Text style={styles.email}>demo@foodapp.com</Text>
			</View>
			<DrawerItemList {...props} />
			<DrawerItem
				label="Help"
				onPress={() =>
					props.navigation.navigate("AppTabs", { screen: "HomeTab" })
				}
			/>
			<DrawerItem
				label="Logout"
				onPress={() => signOut()}
			/>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	drawer: {
		backgroundColor: theme.colors.background,
	},
	scrollContent: {
		paddingTop: 0,
	},
	header: {
		padding: 16,
		alignItems: "center",
		margin: 16,
		borderRadius: 24,
		backgroundColor: theme.colors.surface,
		borderWidth: 1,
		borderColor: theme.colors.border,
	},
	avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
	name: { fontWeight: "bold", color: theme.colors.text, fontSize: 16 },
	email: { color: theme.colors.muted, fontSize: 12, marginTop: 4 },
});
