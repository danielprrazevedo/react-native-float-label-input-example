import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Control from "./src/components/Control";
import Input from "./src/components/Input";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <View style={{ width: "100%", padding: 16 }}>
        <Control>
          <Control.Label>Login</Control.Label>
          <Input />
        </Control>

        <Control>
          <Control.Label>Password</Control.Label>
          <Input secureTextEntry={true} />
        </Control>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
