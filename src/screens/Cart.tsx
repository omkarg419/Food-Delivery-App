import React, { useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { CartContext } from "../context/CartContext";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
	Button,
	EmptyState,
	QuantityStepper,
	Screen,
	SectionHeader,
} from "../components/PremiumUI";
import { theme } from "../theme/theme";

export default function Cart() {
	const { items, clear, addItem } = useContext(CartContext);
	const navigation: any = useNavigation();
	const groupedItems = items.reduce<
		Record<string, { item: (typeof items)[number]; count: number }>
	>((acc, item) => {
		const key = `${item.id}-${item.name}-${item.price}`;
		if (!acc[key]) {
			acc[key] = { item, count: 0 };
		}
		acc[key].count += 1;
		return acc;
	}, {});
	const groups = Object.values(groupedItems);
	const subtotal = items.reduce((sum, item) => sum + item.price, 0);
	const deliveryFee = items.length ? 3.99 : 0;
	const grandTotal = subtotal + deliveryFee;

	return (
		<Screen>
			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.headerCard}>
					<Text style={styles.title}>Your cart</Text>
					<Text style={styles.subtitle}>
						Review items, adjust quantities, and confirm a polished checkout
						flow.
					</Text>
				</View>

				{items.length === 0 ? (
					<EmptyState
						title="Your cart is empty"
						subtitle="Add a few meals from Home or Restaurant Detail to build a premium checkout."
						icon="bag-outline"
					/>
				) : (
					<View style={styles.listStack}>
						{groups.map(({ item, count }) => (
							<View
								key={`${item.id}-${item.name}-${item.price}`}
								style={styles.cartCard}
							>
								<View style={styles.cartCardTop}>
									<View style={styles.cartIconWrap}>
										<Ionicons
											name="fast-food-outline"
											size={18}
											color={theme.colors.accent}
										/>
									</View>
									<View style={styles.cartCopy}>
										<Text style={styles.cartItemName}>{item.name}</Text>
										<Text style={styles.cartItemMeta}>
											Chef recommended • freshly prepared
										</Text>
									</View>
									<Text style={styles.cartItemPrice}>${item.price}</Text>
								</View>
								<View style={styles.cartCardBottom}>
									<QuantityStepper
										count={count}
										onIncrement={() => addItem(item)}
									/>
									<Text style={styles.cartHint}>
										{count > 1
											? "Tap + to add another portion"
											: "Tap + to add more"}
									</Text>
								</View>
							</View>
						))}
					</View>
				)}

				<View style={styles.summaryCard}>
					<SectionHeader
						title="Order summary"
						subtitle="A polished breakdown before checkout."
					/>
					<View style={styles.summaryRow}>
						<Text style={styles.summaryLabel}>Subtotal</Text>
						<Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
					</View>
					<View style={styles.summaryRow}>
						<Text style={styles.summaryLabel}>Delivery fee</Text>
						<Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
					</View>
					<View style={styles.summaryDivider} />
					<View style={styles.summaryRow}>
						<Text style={styles.summaryTotalLabel}>Total</Text>
						<Text style={styles.summaryTotalValue}>
							${grandTotal.toFixed(2)}
						</Text>
					</View>
				</View>

				<Button
					title={items.length ? "Confirm Order" : "Back to restaurants"}
					icon={
						items.length ? "checkmark-circle-outline" : "restaurant-outline"
					}
					onPress={() => {
						if (items.length) {
							clear();
						}
						navigation.dispatch(
							CommonActions.reset({ index: 0, routes: [{ name: "Main" }] }),
						);
					}}
				/>
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	content: {
		padding: 20,
		paddingBottom: 30,
		gap: 16,
	},
	headerCard: {
		padding: 18,
		borderRadius: 28,
		backgroundColor: theme.colors.surface,
		borderWidth: 1,
		borderColor: theme.colors.border,
		gap: 8,
		...theme.shadow,
	},
	title: {
		color: theme.colors.text,
		fontSize: 28,
		fontWeight: "900",
	},
	subtitle: {
		color: theme.colors.muted,
		fontSize: 14,
		lineHeight: 20,
	},
	listStack: {
		gap: 12,
	},
	cartCard: {
		padding: 16,
		borderRadius: 24,
		backgroundColor: theme.colors.surface,
		borderWidth: 1,
		borderColor: theme.colors.border,
		gap: 12,
	},
	cartCardTop: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 12,
	},
	cartIconWrap: {
		width: 42,
		height: 42,
		borderRadius: 14,
		backgroundColor: theme.colors.accentSoft,
		alignItems: "center",
		justifyContent: "center",
	},
	cartCopy: {
		flex: 1,
		gap: 4,
	},
	cartItemName: {
		color: theme.colors.text,
		fontSize: 16,
		fontWeight: "800",
	},
	cartItemMeta: {
		color: theme.colors.muted,
		fontSize: 12,
	},
	cartItemPrice: {
		color: theme.colors.accent,
		fontSize: 16,
		fontWeight: "900",
	},
	cartCardBottom: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 10,
	},
	cartHint: {
		color: theme.colors.subtle,
		fontSize: 12,
		flex: 1,
		textAlign: "right",
	},
	summaryCard: {
		padding: 18,
		borderRadius: 26,
		backgroundColor: theme.colors.surface,
		borderWidth: 1,
		borderColor: theme.colors.border,
		gap: 12,
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	summaryLabel: {
		color: theme.colors.muted,
		fontSize: 13,
	},
	summaryValue: {
		color: theme.colors.text,
		fontSize: 14,
		fontWeight: "800",
	},
	summaryDivider: {
		height: 1,
		backgroundColor: theme.colors.line,
		marginVertical: 4,
	},
	summaryTotalLabel: {
		color: theme.colors.text,
		fontSize: 15,
		fontWeight: "900",
	},
	summaryTotalValue: {
		color: theme.colors.accent,
		fontSize: 18,
		fontWeight: "900",
	},
});
