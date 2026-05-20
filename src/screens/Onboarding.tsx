import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { Button, Pill, Screen } from "../components/PremiumUI";
import { theme } from "../theme/theme";

export default function Onboarding() {
	const navigation: any = useNavigation();
	const { userToken } = useContext(AuthContext);

	return (
		<Screen contentStyle={styles.container}>
			<View style={styles.topRow}>
				<View style={styles.brandBadge}>
					<Ionicons
						name="flame"
						size={16}
						color={theme.colors.background}
					/>
					<Text style={styles.brandBadgeText}>Premium Eats</Text>
				</View>
				<Text style={styles.skipText}>Fresh delivery</Text>
			</View>

			<View style={styles.heroShell}>
				<ImageBackground
					source={{
						uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
					}}
					style={styles.heroImage}
					imageStyle={styles.heroImageRadius}
				>
					<View style={styles.heroOverlay} />
					<View style={styles.heroBadge}>
						<Text style={styles.heroBadgeText}>30 min delivery</Text>
					</View>
					<View style={styles.heroStatsRow}>
						<View style={styles.heroStat}>
							<Text style={styles.heroStatValue}>4.8</Text>
							<Text style={styles.heroStatLabel}>rating</Text>
						</View>
						<View style={styles.heroStat}>
							<Text style={styles.heroStatValue}>1.2K+</Text>
							<Text style={styles.heroStatLabel}>orders</Text>
						</View>
					</View>
				</ImageBackground>
			</View>

			<View style={styles.copyBlock}>
				<Text style={styles.title}>
					Your next craving, delivered beautifully.
				</Text>
				<Text style={styles.subtitle}>
					Explore premium restaurants, curated dishes, and fast delivery in one
					dark, elegant experience.
				</Text>
			</View>

			<View style={styles.pillsRow}>
				<Pill
					label="Top rated restaurants"
					active
				/>
				<Pill label="Fast delivery" />
			</View>

			<View style={styles.ctaStack}>
				<Button
					title="Get Started"
					icon="arrow-forward"
					onPress={() => {
						navigation.navigate(userToken ? "Main" : "Auth");
					}}
				/>
				<Pressable
					onPress={() => navigation.navigate(userToken ? "Main" : "Auth")}
					style={styles.textLinkWrap}
				>
					<Text style={styles.textLink}>I already have an account</Text>
				</Pressable>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 18,
		justifyContent: "space-between",
		gap: 18,
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	brandBadge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		backgroundColor: theme.colors.accent,
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: theme.radii.pill,
	},
	brandBadgeText: {
		color: theme.colors.background,
		fontWeight: "900",
	},
	skipText: {
		color: theme.colors.muted,
		fontWeight: "700",
	},
	heroShell: {
		borderRadius: 32,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: theme.colors.border,
		backgroundColor: theme.colors.surface,
		...theme.shadow,
	},
	heroImage: {
		height: 330,
		justifyContent: "space-between",
		padding: 18,
	},
	heroImageRadius: {
		borderRadius: 32,
	},
	heroOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(9, 11, 16, 0.38)",
	},
	heroBadge: {
		alignSelf: "flex-start",
		backgroundColor: "rgba(11, 13, 18, 0.75)",
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: theme.radii.pill,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.1)",
	},
	heroBadgeText: {
		color: theme.colors.text,
		fontWeight: "800",
	},
	heroStatsRow: {
		flexDirection: "row",
		gap: 12,
	},
	heroStat: {
		flex: 1,
		padding: 14,
		borderRadius: 20,
		backgroundColor: "rgba(11, 13, 18, 0.74)",
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.08)",
	},
	heroStatValue: {
		color: theme.colors.text,
		fontSize: 20,
		fontWeight: "900",
	},
	heroStatLabel: {
		color: theme.colors.muted,
		fontSize: 12,
		marginTop: 2,
	},
	copyBlock: {
		gap: 12,
	},
	title: {
		color: theme.colors.text,
		fontSize: 33,
		lineHeight: 40,
		fontWeight: "900",
		letterSpacing: -0.4,
	},
	subtitle: {
		color: theme.colors.muted,
		fontSize: 15,
		lineHeight: 22,
	},
	pillsRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	},
	ctaStack: {
		gap: 14,
	},
	textLinkWrap: {
		alignItems: "center",
		paddingVertical: 4,
	},
	textLink: {
		color: theme.colors.muted,
		fontWeight: "700",
	},
});
