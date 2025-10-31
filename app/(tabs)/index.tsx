import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";


export default function HomeView() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Bienvenido/a</Text>
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
	}
})