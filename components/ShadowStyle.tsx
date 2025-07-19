import { Platform, useColorScheme } from "react-native";
import { Colors } from "./Colors";

export const ShadowStyle = () => {
  const theme = useColorScheme() ?? "light";
  const shadowColor = Colors[theme].shadowColor;

  return Platform.select({
    ios: {
      shadowColor,
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
    web: {
      boxShadow: `0 3px 6px ${shadowColor}`,
    },
  });
};
