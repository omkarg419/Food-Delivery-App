import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import {
	Button,
	MenuRow,
	Screen,
	SectionHeader,
} from "../components/PremiumUI";
import { theme } from "../theme/theme";

export default function Profile({ navigation }: any) {
	const { signOut } = useContext(AuthContext);

	return (
		<Screen>
			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.headerCard}>
					<View style={styles.avatarWrap}>
						<Image
							source={{ uri: "https://placekitten.com/120/120" }}
							style={styles.avatar}
						/>
					</View>
					<Text style={styles.name}>Demo User</Text>
					<Text style={styles.email}>demo@foodapp.com</Text>
					<View style={styles.statsRow}>
						<View style={styles.statBox}>
							<Text style={styles.statValue}>18</Text>
							<Text style={styles.statLabel}>orders</Text>
						</View>
						<View style={styles.statBox}>
							<Text style={styles.statValue}>4.9</Text>
							<Text style={styles.statLabel}>rating</Text>
						</View>
					</View>
				</View>

				<SectionHeader
					title="Account"
					subtitle="A cleaner profile menu with stronger visual hierarchy."
				/>
				<View style={styles.menuStack}>
					<MenuRow
						title="Open drawer"
						subtitle="Access quick links and app shortcuts"
						icon="menu-outline"
						onPress={() => navigation.openDrawer()}
					/>
					<MenuRow
						title="Saved addresses"
						subtitle="Manage your delivery locations"
						icon="location-outline"
						onPress={() => navigation.navigate("Search")}
					/>
					<MenuRow
						title="Payment methods"
						subtitle="Cards, wallets, and payout settings"
						icon="card-outline"
						onPress={() => navigation.navigate("Orders")}
					/>
					<MenuRow
						title="Logout"
						subtitle="End the current session"
						icon="log-out-outline"
						onPress={() => signOut()}
						danger
					/>
				</View>

				<Button
					title="Logout"
					icon="log-out-outline"
					onPress={() => signOut()}
					variant="secondary"
				/>
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	content: {
		padding: 20,
		paddingBottom: 28,
		gap: 16,
	},
	headerCard: {
		padding: 18,
		borderRadius: 28,
		backgroundColor: theme.colors.surface,
		borderWidth: 1,
		borderColor: theme.colors.border,
		alignItems: "center",
		gap: 10,
		...theme.shadow,
	},
	avatarWrap: {
		padding: 4,
		borderRadius: 50,
		backgroundColor: theme.colors.accentSoft,
	},
	avatar: {
		width: 88,
		height: 88,
		borderRadius: 44,
	},
	name: {
		color: theme.colors.text,
		fontSize: 22,
		fontWeight: "900",
	},
	email: {
		color: theme.colors.muted,
		fontSize: 13,
	},
	statsRow: {
		flexDirection: "row",
		gap: 12,
		width: "100%",
		marginTop: 6,
	},
	statBox: {
		flex: 1,
		padding: 14,
		borderRadius: 18,
		backgroundColor: theme.colors.surfaceElevated,
		borderWidth: 1,
		borderColor: theme.colors.border,
		alignItems: "center",
	},
	statValue: {
		color: theme.colors.text,
		fontSize: 18,
		fontWeight: "900",
	},
	statLabel: {
		color: theme.colors.muted,
		fontSize: 12,
		marginTop: 2,
	},
	menuStack: {
		gap: 12,
	},
});
