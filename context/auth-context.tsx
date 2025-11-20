import { clearSessionFromStorage, loadSessionFromStorage, saveSessionToStorage } from "@/utils/storage";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextProps {
	user: User | null;
	login: (email: string, password: string) => void;
	logout: () => void;
}

export interface User {
	id: string
	email: string;
	password: string;
}

const EXPECTED_USERS = [
	{ id: '1', email: 'usuario.uno@gmail.com', password: '1234' },
	{ id: '2', email: 'usuario.dos@gmail.com', password: '5678' },
]

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

	const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();


	useEffect(() => {
		loadSessionFromStorage().then((loadedUser) => {
			if (loadedUser) {
				setUser(loadedUser);
			}
		});
	}, []);

	useEffect(() => {
		if (user) {
			router.replace('/(tabs)');
		}
	}, [user, router]);

	const login = (email: string, password: string) => {

		if (!email || !password) {
			throw new Error('Email y contraseña son obligatorios');
		}

		if (!emailRegex.test(email)) {
			throw new Error('El formato del email no es válido');
		}
		const foundUser = EXPECTED_USERS.find(
			(user) => user.email === email && user.password === password
		);
		if (foundUser) {
			setUser(foundUser);
			saveSessionToStorage(foundUser);
		} else {
			throw new Error('Credenciales inválidas');
		}
	};

	const logout = () => {
		setUser(null);
		clearSessionFromStorage();
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth debe usarse dentro de un AuthProvider');
	}
	return context;
}

