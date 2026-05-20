import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EmptyState, Screen, SectionHeader } from "../components/PremiumUI";
import { theme } from "../theme/theme";

const ORDERS = [
	{
		id: "1",
		title: "Margherita Feast",
		status: "Delivered",
		time: "Today, 7:35 PM",
		step: 3,
	},
	{
		id: "2",
		title: "Sushi Deluxe Box",
		status: "On the way",
		time: "Yesterday, 8:15 PM",
		step: 2,
	},
	{
		id: "3",
		title: "Burrata Salad Bowl",
		status: "Preparing",
		time: "Wed, 12:20 PM",
		step: 1,
	},
];

export default function Orders() {
	return (
		<Screen>
			<FlatList
				data={ORDERS}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<View style={styles.headerBlock}>
						<Text style={styles.title}>Orders</Text>
						<Text style={styles.subtitle}>
							Track order progress with a richer, more readable hierarchy.
						</Text>
						<SectionHeader
							title="Recent activity"
							subtitle="Your last three orders and their live status."
						/>
					</View>
				}
				ListEmptyComponent={
					<EmptyState
						title="No orders yet"
						subtitle="Once you place your first order, it will appear here with a modern progress timeline."
						icon="receipt-outline"
					/>
				}
				renderItem={({ item }) => (
					<View style={styles.orderCard}>
						<View style={styles.orderTopRow}>
							<View style={styles.orderIconWrap}>
								<Ionicons
									name="bag-check-outline"
									size={18}
									color={theme.colors.accent}
								/>
							</View>
							<View style={styles.orderCopy}>
								<Text style={styles.orderTitle}>{item.title}</Text>
								<Text style={styles.orderTime}>{item.time}</Text>
							</View>
							<View style={styles.statusChip}>
								<Text style={styles.statusChipText}>{item.status}</Text>
							</View>
						</View>

						<View style={styles.timeline}>
							{[1, 2, 3].map((step, index) => (
								<View
									key={step}
									style={styles.timelineStepRow}
								>
									<View
										style={[
											styles.timelineDot,
											step <= item.step && styles.timelineDotActive,
										]}
									/>
									{index < 2 ? (
										<View
											style={[
												styles.timelineLine,
												step < item.step && styles.timelineLineActive,
											]}
										/>
									) : null}
								</View>
							))}
						</View>
						<Text style={styles.orderFooter}>
							Kitchen confirmed • Delivery partner assigned • Completion updates
							enabled
						</Text>
					</View>
				)}
				ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	content: {
		padding: 20,
		paddingBottom: 28,
		gap: 14,
	},
	headerBlock: {
		gap: 10,
		paddingBottom: 8,
	},
	title: {
		color: theme.colors.text,
		fontSize: 30,
		fontWeight: "900",
	},
	subtitle: {
		color: theme.colors.muted,
		fontSize: 14,
		lineHeight: 20,
	},
	orderCard: {
		padding: 18,
		borderRadius: 26,
		backgroundColor: theme.colors.surface,
		borderWidth: 1,
		borderColor: theme.colors.border,
		gap: 14,
		...theme.shadow,
	},
	orderTopRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 12,
	},
	orderIconWrap: {
		width: 42,
		height: 42,
		borderRadius: 14,
		backgroundColor: theme.colors.accentSoft,
		alignItems: "center",
		justifyContent: "center",
	},
	orderCopy: {
		flex: 1,
		gap: 4,
	},
	orderTitle: {
		color: theme.colors.text,
		fontSize: 16,
		fontWeight: "800",
	},
	orderTime: {
		color: theme.colors.muted,
		fontSize: 12,
	},
	statusChip: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: theme.radii.pill,
		backgroundColor: theme.colors.surfaceElevated,
		borderWidth: 1,
		borderColor: theme.colors.border,
	},
	statusChipText: {
		color: theme.colors.text,
		fontSize: 12,
		fontWeight: "800",
	},
	timeline: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 6,
	},
	timelineStepRow: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	timelineDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: theme.colors.surfaceElevated,
		borderWidth: 1,
		borderColor: theme.colors.borderStrong,
	},
	timelineDotActive: {
		backgroundColor: theme.colors.accent,
		borderColor: theme.colors.accent,
	},
	timelineLine: {
		flex: 1,
		height: 2,
		backgroundColor: theme.colors.line,
		marginHorizontal: 6,
	},
	timelineLineActive: {
		backgroundColor: theme.colors.accentSoft,
	},
	orderFooter: {
		color: theme.colors.subtle,
		fontSize: 12,
		lineHeight: 17,
	},
});
