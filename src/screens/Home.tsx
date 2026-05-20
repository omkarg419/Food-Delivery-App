import React, { useContext } from "react";
import {
	View,
	Text,
	FlatList,
	Pressable,
	StyleSheet,
	ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../context/CartContext";
import {
	Card,
	Pill,
	Screen,
	SearchField,
	SectionHeader,
} from "../components/PremiumUI";
import { theme } from "../theme/theme";

const DATA = [
	{
		id: "1",
		name: "Pizza Place",
		price: 12,
		rating: "4.8",
		tag: "Pizza",
		image:
			"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
	},
	{
		id: "2",
		name: "Sushi Corner",
		price: 20,
		rating: "4.9",
		tag: "Sushi",
		image:
			"https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
	},
	{
		id: "3",
		name: "Burger Yard",
		price: 16,
		rating: "4.7",
		tag: "Burgers",
		image:
			"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
	},
	{
		id: "4",
		name: "Pasta Point",
		price: 18,
		rating: "4.6",
		tag: "Pasta",
		image:
			"https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80",
	},
	{
		id: "5",
		name: "Taco Town",
		price: 14,
		rating: "4.5",
		tag: "Tacos",
		image:
			"https://images.unsplash.com/photo-1552332386-f8dd00dc0e7c?auto=format&fit=crop&w=1200&q=80",
	},
];

const categories = ["All", "Pizza", "Sushi", "Burgers", "Desserts"];

export default function Home() {
	const navigation: any = useNavigation();
	const { addItem } = useContext(CartContext);

	return (
		<Screen>
			<FlatList
				data={DATA}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<View style={styles.headerBlock}>
						<View style={styles.headerRow}>
							<View>
								<Text style={styles.greeting}>Good evening</Text>
								<Text style={styles.headerTitle}>
									What would you like to eat?
								</Text>
							</View>
							<Pressable
								onPress={() => navigation.navigate("Cart")}
								style={styles.cartBadge}
							>
								<Ionicons
									name="bag-handle"
									size={18}
									color={theme.colors.background}
								/>
							</Pressable>
						</View>
						<SearchField
							value=""
							onChangeText={() => {}}
							onPress={() => navigation.navigate("Search")}
							editable={false}
						/>
						<View style={styles.heroBanner}>
							<ImageBackground
								source={{
									uri: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
								}}
								style={styles.heroImage}
								imageStyle={styles.heroImageRadius}
							>
								<View style={styles.heroOverlay} />
								<View style={styles.heroBannerContent}>
									<Text style={styles.heroBannerTitle}>
										Free delivery on your first order
									</Text>
									<Text style={styles.heroBannerSub}>
										Curated meals from premium kitchens near you.
									</Text>
								</View>
							</ImageBackground>
						</View>
						<View style={styles.categoryRow}>
							{categories.map((item, index) => (
								<Pill
									key={item}
									label={item}
									active={index === 0}
								/>
							))}
						</View>
						<SectionHeader
							title="Featured restaurants"
							subtitle="Highly rated places that look as good as they taste."
						/>
					</View>
				}
				renderItem={({ item }) => (
					<Card
						title={item.name}
						subtitle="Open now • 25-35 min delivery • 2.5 km away"
						price={`$${item.price}`}
						rating={item.rating}
						tag={item.tag}
						image={item.image}
						onPress={() =>
							navigation.navigate("RestaurantDetail", {
								id: item.id,
								name: item.name,
								price: item.price,
							})
						}
						onAddPress={() =>
							addItem({ id: item.id, name: item.name, price: item.price })
						}
					/>
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
		gap: 16,
	},
	headerBlock: {
		gap: 16,
		paddingBottom: 6,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 14,
	},
	greeting: {
		color: theme.colors.muted,
		fontSize: 13,
		fontWeight: "700",
		textTransform: "uppercase",
		letterSpacing: 0.9,
	},
	headerTitle: {
		color: theme.colors.text,
		fontSize: 28,
		lineHeight: 34,
		fontWeight: "900",
		maxWidth: 260,
	},
	cartBadge: {
		width: 50,
		height: 50,
		borderRadius: 16,
		backgroundColor: theme.colors.accent,
		alignItems: "center",
		justifyContent: "center",
		...theme.shadow,
	},
	heroBanner: {
		borderRadius: 26,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: theme.colors.border,
		...theme.shadow,
	},
	heroImage: {
		height: 170,
		justifyContent: "flex-end",
	},
	heroImageRadius: {
		borderRadius: 26,
	},
	heroOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(7, 9, 13, 0.22)",
	},
	heroBannerContent: {
		padding: 18,
		gap: 6,
	},
	heroBannerTitle: {
		color: theme.colors.text,
		fontSize: 20,
		fontWeight: "900",
	},
	heroBannerSub: {
		color: theme.colors.muted,
		fontSize: 13,
		lineHeight: 18,
	},
	categoryRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	},
});
