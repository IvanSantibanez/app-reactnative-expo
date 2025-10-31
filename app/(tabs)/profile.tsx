import { useAuth } from "@/context/auth-context";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";


export default function ProfileView() {
	const router = useRouter();
	const { user, logout } = useAuth();

	const handleLogout = () => {
		logout();
		router.replace('/login');
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Mi Perfil</Text>
			<Text style={styles.subtitle}>Email: {user?.email} </Text>

			<View style={styles.buttonContainer}>
				<Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleLogout}>
					<Text style={styles.buttonText}>Cerrar sesión</Text>
				</Pressable>
			</View>

		</View>
	)
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		alignItems: "center",
		justifyContent: "space-between"
	},
	title: {
		fontFamily: 'poppins-bold',
		fontSize: 24,
		color: COLORS.textPrimary,
	},
	subtitle: {
		fontFamily: 'inter-regular',
		fontSize: 16,
		color: COLORS.textPrimary,
	},
	buttonContainer: {
		width: "100%",
		paddingHorizontal: 20,
		marginBottom: 30,
	},
	button: {
		padding: 16,
		backgroundColor: "#DC3545",
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: {
		color: "#FFFFFF",
		fontWeight: "bold",
		fontSize: 16,
	},
	buttonPressed: {
		transform: [{ scale: 0.90 }],
		opacity: 0.8
	},
})