import React from "react";
import { View, StyleSheet, Pressable, Linking } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useThemeColors } from "./useThemeColors";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export default function Footer() {
  const colors = useThemeColors();
  return (
    <ThemedView style={styles.container} color={colors.card}>
      <View style={styles.left}>
        <ThemedText style={styles.name}>Ali Cihan Saraç</ThemedText>
        <ThemedText style={styles.title}>iOS Developer</ThemedText>
      </View>

      <View style={styles.right}>
        <Pressable
          onPress={() => Linking.openURL("mailto:alicihansarac@gmail.com")}
        >
          <Feather name="mail" size={24} color={colors.text} />
        </Pressable>
        <Pressable
          onPress={() =>
            Linking.openURL("https://www.linkedin.com/in/alicihansarac/")
          }
        >
          <Feather name="linkedin" size={24} color={colors.text} />
        </Pressable>
        <Pressable onPress={() => Linking.openURL("https://github.com/acs027")}>
          <Feather name="github" size={24} color={colors.text} />
        </Pressable>

        <Pressable
          onPress={() => Linking.openURL("https://medium.com/@alicihansarac")}
        >
          <Entypo name="medium" size={24} color={colors.text} />
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    paddingBottom: 100,
  },
  left: {
    gap: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
  },
  right: {
    flexDirection: "row",
    gap: 24,
  },
});
