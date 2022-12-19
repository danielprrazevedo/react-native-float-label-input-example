import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

type ControlContextProps = {
  isFocused: boolean;
  hasValue: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  setHasValue: Dispatch<SetStateAction<boolean>>;
};

const ControlContext = createContext<ControlContextProps>(null!);

function useControlContext(): Partial<ControlContextProps> {
  const context = useContext(ControlContext);
  if (!context) return {};
  return context;
}

function Label({ children }: PropsWithChildren) {
  const { isFocused, hasValue } = useControlContext();

  const { current: translateYAnim } = useRef(new Animated.Value(8));
  const { current: scaleAnim } = useRef(new Animated.Value(1));

  useEffect(() => {
    const scale = isFocused || hasValue ? 0.9 : 1;
    const translateY = isFocused || hasValue ? -11 : 8;
    Animated.timing(translateYAnim, {
      toValue: translateY,
      duration: 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(scaleAnim, {
      toValue: scale,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [isFocused, hasValue]);

  return (
    <Animated.View
      style={[
        styles.label,
        isFocused || hasValue ? styles.labelTop : {},
        { transform: [{ translateY: translateYAnim }, { scale: scaleAnim }] },
      ]}
    >
      <Text>{children}</Text>
    </Animated.View>
  );
}

type ControlProps = {};

function Control({ children }: PropsWithChildren<ControlProps>) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  return (
    <View style={[styles.container]}>
      <ControlContext.Provider
        value={{ isFocused, setIsFocused, hasValue, setHasValue }}
      >
        {children}
      </ControlContext.Provider>
    </View>
  );
}

export { useControlContext };
export default Object.assign(Control, { Label });

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 8,
    paddingHorizontal: 4,
    paddingBottom: 2,
  },
  labelTop: {
    zIndex: 1,
    backgroundColor: "#fff",
  },
});
