import React from "react";
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
	ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme/theme";

type ScreenProps = {
	children: React.ReactNode;
	contentStyle?: ViewStyle;
};

export function Screen({ children, contentStyle }: ScreenProps) {
	return (
		<SafeAreaView style={styles.screen}>
			<View style={[styles.screenContent, contentStyle]}>{children}</View>
		</SafeAreaView>
	);
}

type SectionHeaderProps = {
	title: string;
	subtitle?: string;
	actionLabel?: string;
	onActionPress?: () => void;
};

export function SectionHeader({
	title,
	subtitle,
	actionLabel,
	onActionPress,
}: SectionHeaderProps) {
	return (
		<View style={styles.sectionHeader}>
			<View style={styles.sectionHeaderCopy}>
				<Text style={styles.sectionTitle}>{title}</Text>
				{subtitle ? (
					<Text style={styles.sectionSubtitle}>{subtitle}</Text>
				) : null}
			</View>
			{actionLabel ? (
				<Pressable
					onPress={onActionPress}
					style={styles.sectionAction}
				>
					<Text style={styles.sectionActionText}>{actionLabel}</Text>
				</Pressable>
			) : null}
		</View>
	);
}

type ButtonProps = {
	title: string;
	onPress?: () => void;
	icon?: keyof typeof Ionicons.glyphMap;
	disabled?: boolean;
	compact?: boolean;
	variant?: "primary" | "secondary" | "ghost";
};

export function Button({
	title,
	onPress,
	icon,
	disabled,
	compact,
	variant = "primary",
}: ButtonProps) {
	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			style={({ pressed }) => [
				styles.button,
				variant === "secondary" && styles.buttonSecondary,
				variant === "ghost" && styles.buttonGhost,
				compact && styles.buttonCompact,
				disabled && styles.buttonDisabled,
				pressed && !disabled && styles.buttonPressed,
			]}
		>
			{icon ? (
				<Ionicons
					name={icon}
					size={18}
					color={
						variant === "primary" ? theme.colors.background : theme.colors.text
					}
					style={styles.buttonIcon}
				/>
			) : null}
			<Text
				style={[
					styles.buttonText,
					variant !== "primary" && styles.buttonTextAlt,
					disabled && styles.buttonTextDisabled,
				]}
			>
				{title}
			</Text>
		</Pressable>
	);
}

type SearchFieldProps = {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	icon?: keyof typeof Ionicons.glyphMap;
	onPress?: () => void;
	editable?: boolean;
};

export function SearchField({
	value,
	onChangeText,
	placeholder = "Search for food, restaurants, cuisines...",
	icon = "search",
	onPress,
	editable = true,
}: SearchFieldProps) {
	return (
		<Pressable
			onPress={onPress}
			style={styles.searchShell}
		>
			<Ionicons
				name={icon}
				size={18}
				color={theme.colors.muted}
			/>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={theme.colors.subtle}
				style={styles.searchInput}
				editable={editable}
			/>
			<Ionicons
				name="options-outline"
				size={18}
				color={theme.colors.muted}
			/>
		</Pressable>
	);
}

type PillProps = {
	label: string;
	active?: boolean;
	onPress?: () => void;
};

export function Pill({ label, active, onPress }: PillProps) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.pill,
				active && styles.pillActive,
				pressed && styles.pillPressed,
			]}
		>
			<Text style={[styles.pillText, active && styles.pillTextActive]}>
				{label}
			</Text>
		</Pressable>
	);
}

type CardProps = {
	title: string;
	subtitle: string;
	price?: string;
	rating?: string;
	tag?: string;
	image?: string;
	onPress?: () => void;
	onAddPress?: () => void;
};

export function Card({
	title,
	subtitle,
	price,
	rating,
	tag,
	image,
	onPress,
	onAddPress,
}: CardProps) {
	return (
		<Pressable
			onPress={onPress}
			style={styles.card}
		>
			{image ? (
				<Image
					source={{ uri: image }}
					style={styles.cardImage}
					resizeMode="cover"
				/>
			) : null}
			<View style={styles.cardBody}>
				<View style={styles.cardTopRow}>
					<View style={styles.cardCopy}>
						<Text style={styles.cardTitle}>{title}</Text>
						<Text style={styles.cardSubtitle}>{subtitle}</Text>
					</View>
					{price ? <Text style={styles.cardPrice}>{price}</Text> : null}
				</View>
				<View style={styles.cardMetaRow}>
					{rating ? (
						<View style={styles.metaChip}>
							<Ionicons
								name="star"
								size={12}
								color={theme.colors.warning}
							/>
							<Text style={styles.metaChipText}>{rating}</Text>
						</View>
					) : null}
					{tag ? (
						<View style={styles.metaTag}>
							<Text style={styles.metaTagText}>{tag}</Text>
						</View>
					) : null}
					{onAddPress ? (
						<Pressable
							onPress={onAddPress}
							style={styles.addMiniButton}
						>
							<Ionicons
								name="add"
								size={16}
								color={theme.colors.background}
							/>
						</Pressable>
					) : null}
				</View>
			</View>
		</Pressable>
	);
}

type MenuRowProps = {
	title: string;
	subtitle?: string;
	icon?: keyof typeof Ionicons.glyphMap;
	onPress?: () => void;
	danger?: boolean;
};

export function MenuRow({
	title,
	subtitle,
	icon = "chevron-forward",
	onPress,
	danger,
}: MenuRowProps) {
	return (
		<Pressable
			onPress={onPress}
			style={styles.menuRow}
		>
			<View style={styles.menuRowLeft}>
				<View
					style={[styles.menuIconWrap, danger && styles.menuIconWrapDanger]}
				>
					<Ionicons
						name={icon}
						size={18}
						color={danger ? theme.colors.accentAlt : theme.colors.text}
					/>
				</View>
				<View>
					<Text
						style={[styles.menuRowTitle, danger && styles.menuRowTitleDanger]}
					>
						{title}
					</Text>
					{subtitle ? (
						<Text style={styles.menuRowSubtitle}>{subtitle}</Text>
					) : null}
				</View>
			</View>
			<Ionicons
				name="chevron-forward"
				size={18}
				color={theme.colors.subtle}
			/>
		</Pressable>
	);
}

type EmptyStateProps = {
	title: string;
	subtitle: string;
	icon?: keyof typeof Ionicons.glyphMap;
};

export function EmptyState({
	title,
	subtitle,
	icon = "fast-food-outline",
}: EmptyStateProps) {
	return (
		<View style={styles.emptyState}>
			<View style={styles.emptyIconWrap}>
				<Ionicons
					name={icon}
					size={30}
					color={theme.colors.accent}
				/>
			</View>
			<Text style={styles.emptyTitle}>{title}</Text>
			<Text style={styles.emptySubtitle}>{subtitle}</Text>
		</View>
	);
}

type QuantityStepperProps = {
	count: number;
	onIncrement: () => void;
	onDecrement?: () => void;
};

export function QuantityStepper({
	count,
	onIncrement,
	onDecrement,
}: QuantityStepperProps) {
	return (
		<View style={styles.quantityStepper}>
			<Pressable
				onPress={onDecrement}
				disabled={!onDecrement}
				style={({ pressed }) => [
					styles.quantityButton,
					!onDecrement && styles.quantityButtonDisabled,
					pressed && onDecrement && styles.buttonPressed,
				]}
			>
				<Ionicons
					name="remove"
					size={16}
					color={theme.colors.text}
				/>
			</Pressable>
			<Text style={styles.quantityCount}>{count}</Text>
			<Pressable
				onPress={onIncrement}
				style={({ pressed }) => [
					styles.quantityButton,
					pressed && styles.buttonPressed,
				]}
			>
				<Ionicons
					name="add"
					size={16}
					color={theme.colors.background}
				/>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	screenContent: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		gap: theme.spacing.md,
	},
	sectionHeaderCopy: {
		flex: 1,
		gap: 4,
	},
	sectionTitle: {
		color: theme.colors.text,
		fontSize: 20,
		fontWeight: "800",
		letterSpacing: 0.2,
	},
	sectionSubtitle: {
		color: theme.colors.muted,
		fontSize: 13,
		lineHeight: 18,
	},
	sectionAction: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: theme.radii.pill,
		backgroundColor: theme.colors.surfaceElevated,
		borderWidth: 1,
		borderColor: theme.colors.border,
	},
	sectionActionText: {
		color: theme.colors.text,
		fontWeight: "700",
		fontSize: 12,
	},
	button: {
		minHeight: 52,
		borderRadius: theme.radii.md,
		backgroundColor: theme.colors.accent,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: theme.spacing.lg,
		flexDirection: "row",
		gap: 8,
		...theme.shadow,
	},
	buttonSecondary: {
		backgroundColor: theme.colors.surfaceElevated,
		borderWidth: 1,
		borderColor: theme.colors.borderStrong,
		shadowOpacity: 0.2,
	},
	buttonGhost: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: theme.colors.borderStrong,
		shadowOpacity: 0,
		elevation: 0,
	},
	buttonCompact: {
		minHeight: 42,
		paddingHorizontal: 16,
	},
	buttonDisabled: {
		opacity: 0.45,
	},
	buttonPressed: {
		transform: [{ scale: 0.98 }],
		opacity: 0.94,
	},
	buttonIcon: {
		marginRight: 2,
	},
	buttonText: {
		color: theme.colors.background,
		fontWeight: "800",
		fontSize: 15,
	},
	buttonTextAlt: {
		color: theme.colors.text,
	},
	buttonTextDisabled: {
		color: theme.colors.subtle,
	},
	searchShell: {
		minHeight: 56,
		borderRadius: theme.radii.md,
		backgroundColor: theme.colors.input,
		borderWidth: 1,
		borderColor: theme.colors.border,
		paddingHorizontal: theme.spacing.md,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	searchInput: {
		flex: 1,
		color: theme.colors.text,
		fontSize: 15,
		paddingVertical: 0,
	},
	pill: {
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: theme.radii.pill,
		backgroundColor: theme.colors.chip,
		borderWidth: 1,
		borderColor: theme.colors.border,
	},
	pillActive: {
		backgroundColor: theme.colors.accentSoft,
		borderColor: "rgba(255,122,24,0.42)",
	},
	pillPressed: {
		opacity: 0.88,
	},
	pillText: {
		color: theme.colors.muted,
		fontSize: 13,
		fontWeight: "600",
	},
	pillTextActive: {
		color: theme.colors.text,
	},
	card: {
		borderRadius: theme.radii.lg,
		overflow: "hidden",
		backgroundColor: theme.colors.surface,
		borderWidth: 1,
		borderColor: theme.colors.border,
		...theme.shadow,
	},
	cardImage: {
		width: "100%",
		height: 168,
	},
	cardBody: {
		padding: theme.spacing.md,
		gap: 12,
	},
	cardTopRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		gap: theme.spacing.md,
	},
	cardCopy: {
		flex: 1,
		gap: 6,
	},
	cardTitle: {
		color: theme.colors.text,
		fontSize: 17,
		fontWeight: "800",
	},
	cardSubtitle: {
		color: theme.colors.muted,
		fontSize: 13,
		lineHeight: 18,
	},
	cardPrice: {
		color: theme.colors.accent,
		fontSize: 17,
		fontWeight: "900",
	},
	cardMetaRow: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
		gap: 8,
	},
	metaChip: {
		paddingHorizontal: 10,
		paddingVertical: 7,
		borderRadius: theme.radii.pill,
		backgroundColor: theme.colors.surfaceElevated,
		borderWidth: 1,
		borderColor: theme.colors.border,
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	metaChipText: {
		color: theme.colors.text,
		fontSize: 12,
		fontWeight: "700",
	},
	metaTag: {
		paddingHorizontal: 10,
		paddingVertical: 7,
		borderRadius: theme.radii.pill,
		backgroundColor: theme.colors.accentSoft,
	},
	metaTagText: {
		color: theme.colors.accent,
		fontSize: 12,
		fontWeight: "700",
	},
	addMiniButton: {
		width: 34,
		height: 34,
		borderRadius: 17,
		backgroundColor: theme.colors.accent,
		alignItems: "center",
		justifyContent: "center",
		marginLeft: "auto",
	},
	menuRow: {
		padding: theme.spacing.md,
		borderRadius: theme.radii.md,
		backgroundColor: theme.colors.surface,
		borderWidth: 1,
		borderColor: theme.colors.border,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	menuRowLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		flex: 1,
	},
	menuIconWrap: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: theme.colors.surfaceElevated,
		alignItems: "center",
		justifyContent: "center",
	},
	menuIconWrapDanger: {
		backgroundColor: "rgba(255,77,77,0.12)",
	},
	menuRowTitle: {
		color: theme.colors.text,
		fontWeight: "800",
		fontSize: 15,
	},
	menuRowTitleDanger: {
		color: theme.colors.accentAlt,
	},
	menuRowSubtitle: {
		color: theme.colors.muted,
		fontSize: 12,
		marginTop: 2,
	},
	emptyState: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 36,
		paddingHorizontal: theme.spacing.lg,
		gap: 10,
	},
	emptyIconWrap: {
		width: 64,
		height: 64,
		borderRadius: 32,
		backgroundColor: theme.colors.surfaceElevated,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: theme.colors.border,
	},
	emptyTitle: {
		color: theme.colors.text,
		fontSize: 18,
		fontWeight: "800",
	},
	emptySubtitle: {
		color: theme.colors.muted,
		fontSize: 13,
		textAlign: "center",
		lineHeight: 18,
	},
	quantityStepper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		padding: 6,
		borderRadius: theme.radii.pill,
		backgroundColor: theme.colors.surfaceElevated,
		borderWidth: 1,
		borderColor: theme.colors.border,
	},
	quantityButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: theme.colors.accent,
		alignItems: "center",
		justifyContent: "center",
	},
	quantityButtonDisabled: {
		backgroundColor: theme.colors.surface,
	},
	quantityCount: {
		minWidth: 24,
		textAlign: "center",
		color: theme.colors.text,
		fontWeight: "800",
		fontSize: 15,
	},
});
