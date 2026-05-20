import React, { createContext, ReactNode, useState } from "react";

type CartItem = { id: string; name: string; price: number };

type CartContextType = {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	clear: () => void;
};

export const CartContext = createContext<CartContextType>({
	items: [],
	addItem: () => {},
	clear: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [items, setItems] = useState<CartItem[]>([]);

	const addItem = (item: CartItem) => setItems((s) => [...s, item]);
	const clear = () => setItems([]);

	return (
		<CartContext.Provider value={{ items, addItem, clear }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
