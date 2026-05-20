import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
	userToken: string | null;
	signIn: (name: string) => Promise<void>;
	signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
	userToken: null,
	signIn: async () => {},
	signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [userToken, setUserToken] = useState<string | null>(null);

	useEffect(() => {
		const restore = async () => {
			const token = await AsyncStorage.getItem("userToken");
			if (token) setUserToken(token);
		};
		restore();
	}, []);

	const signIn = async (name: string) => {
		const token = `token-${name}`;
		await AsyncStorage.setItem("userToken", token);
		setUserToken(token);
	};

	const signOut = async () => {
		await AsyncStorage.removeItem("userToken");
		setUserToken(null);
	};

	return (
		<AuthContext.Provider value={{ userToken, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
