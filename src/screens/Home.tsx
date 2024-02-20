import { SafeAreaView, StyleSheet, Text } from "react-native"

export default (props: any): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Logado com sucesso</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  text: {
    fontSize: 20,
    color: "#eee",
    fontWeight: "bold",
  },
})
