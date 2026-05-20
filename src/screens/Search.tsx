import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
	Card,
	EmptyState,
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
];

export default function Search() {
	const navigation: any = useNavigation();
	const [query, setQuery] = React.useState("");
	const normalized = query.trim().toLowerCase();
	const results = DATA.filter(
		(item) =>
			!normalized ||
			item.name.toLowerCase().includes(normalized) ||
			item.tag?.toLowerCase().includes(normalized),
	);

	return (
		<Screen>
			<FlatList
				data={results}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<View style={styles.headerBlock}>
						<Text style={styles.title}>Search</Text>
						<Text style={styles.subtitle}>
							Find dishes and restaurants with a premium dark search experience.
						</Text>
						<SearchField
							value={query}
							onChangeText={setQuery}
							placeholder="Search restaurants or cuisines"
						/>
						<View style={styles.pillsRow}>
							<Pill
								label="Trending"
								active
							/>
							<Pill label="Near me" />
							<Pill label="Healthy" />
						</View>
						<SectionHeader
							title="Results"
							subtitle={
								normalized
									? `${results.length} places matched your search`
									: "Popular matches in your area"
							}
						/>
					</View>
				}
				ListEmptyComponent={
					normalized ? (
						<EmptyState
							title="No matches found"
							subtitle="Try a different keyword or clear the search term to see popular spots."
							icon="search-outline"
						/>
					) : (
						<EmptyState
							title="Start typing to search"
							subtitle="Browse restaurants, cuisines, and signature dishes as you type."
							icon="restaurant-outline"
						/>
					)
				}
				renderItem={({ item }) => (
					<Card
						title={item.name}
						subtitle="Open now • 25-35 min delivery"
						price={`$${item.price}`}
						rating={item.rating}
						tag={item.tag}
						image={item.image}
						onPress={() =>
							navigation.navigate("HomeTab", {
								screen: "RestaurantDetail",
								params: { id: item.id, name: item.name, price: item.price },
							})
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
		gap: 14,
		paddingBottom: 6,
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
	pillsRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	},
});
