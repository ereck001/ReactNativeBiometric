import { NavigationContainer } from "@react-navigation/native"
import Stack from "./src/routes/stack.routes"

export default (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  )
}
