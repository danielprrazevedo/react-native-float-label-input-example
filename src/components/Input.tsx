import { useEffect } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
} from "react-native";
import { useControlContext } from "./Control";

function Input({
  value,
  style,
  onChangeText,
  onFocus,
  onBlur,
  ...props
}: TextInputProps) {
  const { setIsFocused, setHasValue } = useControlContext();
  function handleWithOnChangeText(text: string) {
    if (setHasValue) setHasValue(text.length > 0);
    if (onChangeText) onChangeText(text);
  }

  function handleWithOnBlur(
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) {
    if (setIsFocused) setIsFocused(false);
    if (onBlur) onBlur(event);
  }

  function handleWithOnFocus(
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) {
    if (setIsFocused) setIsFocused(true);
    if (onFocus) onFocus(event);
  }

  useEffect(() => {
    if (setHasValue) setHasValue(typeof value === "string" && value.length > 0);
  }, [value]);

  return (
    <TextInput
      {...props}
      style={[styles.input, style]}
      onChangeText={handleWithOnChangeText}
      onBlur={handleWithOnBlur}
      onFocus={handleWithOnFocus}
      value={value}
    />
  );
}

export default Input;

const styles = StyleSheet.create({
  input: {
    borderColor: "#555",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
