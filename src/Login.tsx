import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  StyleProp,
  TextStyle,
  Alert,
} from "react-native"
import * as LocalAuthentication from "expo-local-authentication"
import { useState, useEffect } from "react"
import * as SecureStore from "expo-secure-store"

export default (props: any): JSX.Element => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<string | null>("")
  const [password, setPassword] = useState<string | null>("")
  const [isInputUserOnFocus, setIsInputUserOnFocus] = useState<boolean>(false)
  const [isInputPasswordOnFocus, setIsInputPasswordOnFocus] = useState<boolean>(false)

  const styleFocus = {
    borderColor: "yellowgreen",
    borderWidth: 2,
  } as StyleProp<TextStyle>

  useEffect(() => {
    verifyAvaliableAuthentication()
  }, [])

  useEffect(() => {
    async function setLoginData(): Promise<void> {
      const storedUser = await SecureStore.getItemAsync("user")
      const storedPassword = await SecureStore.getItemAsync("password")
      setUser(storedUser && storedUser)
      //setPassword(storedPassword && storedPassword)
      handleAuthentication()
    }
    setLoginData()
  }, [])

  useEffect(() => {
    authenticated && props.navigation.replace("Home")
  }, [authenticated])

  async function verifyAvaliableAuthentication(): Promise<void> {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    console.log("É compativel?", compatible ? "Sim" : "Não")
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync()
    const typeNames = LocalAuthentication.AuthenticationType
    types.map((type: number) => {
      console.log("Tipo", typeNames[type])
      console.log("OK")
    })
  }

  async function handleAuthentication(): Promise<void> {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync()
    console.log("Biometria", isBiometricEnrolled ? "Sim" : "Não")
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login com Biometria",
      fallbackLabel: "Erro ao ler Biometria",
    })
    auth && setAuthenticated(true)
  }

  async function handleClick(): Promise<void> {
    if (!user || !password) {
      return
    }

    if (user.trim().toLowerCase() !== "admin" && password.trim() !== "1234") {
      Alert.alert("Dados Inválidos", "Dados Inválidos")
      return
    }
    if (user.trim().toLowerCase() !== "admin") {
      Alert.alert("Dados Inválidos", "O Usuário não está registrado!")
      return
    }
    if (password.trim() !== "1234") {
      Alert.alert("Dados Inválidos", "Sua Senha está incorreta")
      return
    }
    await SecureStore.setItemAsync("user", user)
    await SecureStore.setItemAsync("password", password)

    setUser("")
    setPassword("")
    setAuthenticated(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>Login</Text>
      <View style={styles.inputsContainer}>
        <TextInput
          onFocus={() => setIsInputUserOnFocus(true)}
          onBlur={() => setIsInputUserOnFocus(false)}
          style={[styles.input, isInputUserOnFocus ? styleFocus : {}]}
          placeholder="Usuário"
          value={user?.toString()}
          onChangeText={setUser}
          placeholderTextColor="#777"
        />
        <TextInput
          onFocus={() => setIsInputPasswordOnFocus(true)}
          onBlur={() => setIsInputPasswordOnFocus(false)}
          style={[styles.input, isInputPasswordOnFocus ? styleFocus : {}]}
          placeholder="Senha"
          value={password?.toString()}
          onChangeText={setPassword}
          placeholderTextColor="#777"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleClick}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 8,
  },
  paragraph: {
    fontSize: 20,
    textAlign: "center",
    color: "#eee",
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  btn: {
    marginTop: 20,
    borderRadius: 7,
    height: 50,
    width: "96%",
    backgroundColor: "yellowgreen",
    justifyContent: "center",
  },
  inputsContainer: {
    width: "96%",
  },
  input: {
    width: "100%",
    height: 60,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#bbb",
    marginTop: 12,
    paddingHorizontal: 8,
    color: "#eee",
    backgroundColor: "#444",
  },
})
