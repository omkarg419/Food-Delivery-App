import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { Button, Screen } from "../components/PremiumUI";
import { theme } from "../theme/theme";

export default function Login() {
	const { signIn } = useContext(AuthContext);
	const [name, setName] = useState("User");
	const [error, setError] = useState("");

	const handleSignIn = () => {
		const trimmed = name.trim();
		if (!trimmed) {
			setError("Please enter your name to continue.");
			return;
		}

		setError("");
		signIn(trimmed);
	};

	return (
		<Screen contentStyle={styles.container}>
			<View style={styles.hero}>
				<View style={styles.iconBadge}>
					<Ionicons
						name="person-circle"
						size={28}
						color={theme.colors.background}
					/>
				</View>
				<Text style={styles.title}>Welcome back</Text>
				<Text style={styles.subtitle}>
					Sign in to save your orders, track delivery, and keep your favorites
					close.
				</Text>
			</View>

			<View style={styles.formCard}>
				<Text style={styles.label}>Your name</Text>
				<View style={styles.inputShell}>
					<Ionicons
						name="person-outline"
						size={18}
						color={theme.colors.subtle}
					/>
					<TextInput
						value={name}
						onChangeText={(text) => {
							setName(text);
							if (error) setError("");
						}}
						style={styles.input}
						placeholder="Enter your name"
						placeholderTextColor={theme.colors.subtle}
					/>
				</View>
				{error ? (
					<Text style={styles.errorText}>{error}</Text>
				) : (
					<Text style={styles.helperText}>
						Demo authentication uses a local async storage token.
					</Text>
				)}

				<Button
					title="Sign In"
					icon="log-in-outline"
					onPress={handleSignIn}
				/>
				<View style={styles.socialRow}>
					<Pressable style={styles.socialButton}>
						<Ionicons
							name="logo-google"
							size={18}
							color={theme.colors.text}
						/>
						<Text style={styles.socialText}>Google</Text>
					</Pressable>
					<Pressable style={styles.socialButton}>
						<Ionicons
							name="logo-apple"
							size={18}
							color={theme.colors.text}
						/>
						<Text style={styles.socialText}>Apple</Text>
					</Pressable>
				</View>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 18,
		justifyContent: "center",
		gap: 18,
	},
	hero: {
		gap: 10,
	},
	iconBadge: {
		width: 60,
		height: 60,
		borderRadius: 20,
		backgroundColor: theme.colors.accent,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		color: theme.colors.text,
		fontSize: 30,
		fontWeight: "900",
	},
	subtitle: {
		color: theme.colors.muted,
		fontSize: 14,
		lineHeight: 21,
	},
	formCard: {
		padding: 18,
		borderRadius: 28,
		backgroundColor: theme.colors.surface,
		borderWidth: 1,
		borderColor: theme.colors.border,
		gap: 14,
		...theme.shadow,
	},
	label: {
		color: theme.colors.muted,
		fontSize: 12,
		fontWeight: "700",
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	inputShell: {
		minHeight: 58,
		borderRadius: theme.radii.md,
		backgroundColor: theme.colors.input,
		borderWidth: 1,
		borderColor: theme.colors.border,
		paddingHorizontal: 14,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	input: {
		flex: 1,
		color: theme.colors.text,
		fontSize: 15,
		paddingVertical: 0,
	},
	helperText: {
		color: theme.colors.subtle,
		fontSize: 12,
		lineHeight: 17,
	},
	errorText: {
		color: theme.colors.accentAlt,
		fontSize: 12,
		lineHeight: 17,
	},
	socialRow: {
		flexDirection: "row",
		gap: 12,
	},
	socialButton: {
		flex: 1,
		minHeight: 50,
		borderRadius: theme.radii.md,
		borderWidth: 1,
		borderColor: theme.colors.border,
		backgroundColor: theme.colors.surfaceElevated,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
	},
	socialText: {
		color: theme.colors.text,
		fontWeight: "800",
	},
});
