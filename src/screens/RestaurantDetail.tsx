import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../context/CartContext";
import { Button, Card, Screen, SectionHeader } from "../components/PremiumUI";
import { theme } from "../theme/theme";

export default function RestaurantDetail() {
	const navigation: any = useNavigation();
	const route: any = useRoute();
	const { addItem } = useContext(CartContext);
	const { id, name, price } = route.params || {};
	const basePrice = typeof price === "number" ? price : Number(price) || 0;
	const recommendations = [
		{
			id: `${id}-1`,
			name: "Truffle Margherita",
			price: basePrice + 4,
			subtitle: "Stone-baked crust • 18 min",
			image:
				"https://images.unsplash.com/photo-1548365328-9f547fb095c8?auto=format&fit=crop&w=1200&q=80",
		},
		{
			id: `${id}-2`,
			name: "Smoked Burrata Bowl",
			price: basePrice + 6,
			subtitle: "Fresh basil • roasted tomatoes",
			image:
				"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
		},
	];

	return (
		<Screen>
			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.heroCard}>
					<ImageBackground
						source={{
							uri: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
						}}
						style={styles.heroImage}
						imageStyle={styles.heroImageRadius}
					>
						<View style={styles.heroOverlay} />
						<View style={styles.heroContent}>
							<View style={styles.heroTag}>
								<Ionicons
									name="star"
									size={14}
									color={theme.colors.warning}
								/>
								<Text style={styles.heroTagText}>4.9 • Premium kitchen</Text>
							</View>
							<Text style={styles.heroTitle}>{name}</Text>
							<Text style={styles.heroSubtitle}>
								Fine ingredients, fast preparation, and a rich dark dining
								experience.
							</Text>
						</View>
					</ImageBackground>
				</View>

				<View style={styles.statsRow}>
					<View style={styles.statCard}>
						<Text style={styles.statValue}>25-35 min</Text>
						<Text style={styles.statLabel}>delivery time</Text>
					</View>
					<View style={styles.statCard}>
						<Text style={styles.statValue}>4.9</Text>
						<Text style={styles.statLabel}>rating</Text>
					</View>
					<View style={styles.statCard}>
						<Text style={styles.statValue}>${basePrice}</Text>
						<Text style={styles.statLabel}>base price</Text>
					</View>
				</View>

				<Button
					title="Add to cart"
					icon="bag-add-outline"
					onPress={() => addItem({ id, name, price: basePrice })}
				/>
				<Button
					title="Go to Cart"
					variant="secondary"
					icon="cart-outline"
					onPress={() => navigation.navigate("Cart")}
				/>

				<SectionHeader
					title="Recommended dishes"
					subtitle="Hand-picked items that match the restaurant vibe."
				/>
				<View style={styles.recommendationStack}>
					{recommendations.map((item) => (
						<Card
							key={item.id}
							title={item.name}
							subtitle={item.subtitle}
							price={`$${item.price}`}
							image={item.image}
							onAddPress={() =>
								addItem({ id: item.id, name: item.name, price: item.price })
							}
						/>
					))}
				</View>

				<Button
					title="Replace with Home"
					variant="ghost"
					onPress={() => navigation.replace("RestaurantList")}
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
	heroCard: {
		borderRadius: 30,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: theme.colors.border,
		...theme.shadow,
	},
	heroImage: {
		height: 320,
		justifyContent: "flex-end",
	},
	heroImageRadius: {
		borderRadius: 30,
	},
	heroOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(9, 11, 16, 0.34)",
	},
	heroContent: {
		padding: 18,
		gap: 10,
	},
	heroTag: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		backgroundColor: "rgba(11, 13, 18, 0.78)",
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: theme.radii.pill,
	},
	heroTagText: {
		color: theme.colors.text,
		fontWeight: "800",
		fontSize: 12,
	},
	heroTitle: {
		color: theme.colors.text,
		fontSize: 28,
		lineHeight: 34,
		fontWeight: "900",
	},
	heroSubtitle: {
		color: theme.colors.muted,
		fontSize: 14,
		lineHeight: 20,
		maxWidth: 290,
	},
	statsRow: {
		flexDirection: "row",
		gap: 10,
	},
	statCard: {
		flex: 1,
		padding: 14,
		borderRadius: 20,
		backgroundColor: theme.colors.surface,
		borderWidth: 1,
		borderColor: theme.colors.border,
	},
	statValue: {
		color: theme.colors.text,
		fontSize: 15,
		fontWeight: "900",
	},
	statLabel: {
		color: theme.colors.muted,
		fontSize: 12,
		marginTop: 4,
	},
	recommendationStack: {
		gap: 14,
	},
});
