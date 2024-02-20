import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"
import Login from "../Login"

const Stack = createNativeStackNavigator()

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}
