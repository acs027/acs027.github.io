import React from "react";
import { View, StyleSheet, Pressable, Linking, useWindowDimensions } from "react-native";
import { Feather, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { useThemeColors } from "../utils/useThemeColors";
import { ThemedView } from "../utils/ThemedView";
import { ThemedText } from "../utils/ThemedText";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isMobile = width < 600;

  const currentYear = new Date().getFullYear();

  return (
    <ThemedView style={styles.container} color={colors.card}>
      <View style={[styles.content, isMobile && styles.mobileContent]}>
        
        {/* Branding & Signature */}
        <View style={[styles.left, isMobile && styles.centerAlign]}>
          <ThemedText style={styles.name}>{t("footer.name")}</ThemedText>
          <ThemedText style={styles.title}>{t("footer.title")}</ThemedText>
          <ThemedText style={styles.copyright}>
            © {currentYear} • aCs
          </ThemedText>
        </View>

        {/* Quick Social Links */}
        <View style={[styles.right, isMobile && styles.mobileGap]}>
          <Pressable 
            hitSlop={10}
            onPress={() => Linking.openURL("mailto:alicihansarac@gmail.com")}
            style={({ pressed }) => [styles.iconCircle, pressed && styles.pressed]}
          >
            <Feather name="mail" size={20} color={colors.text} />
          </Pressable>

          <Pressable 
            hitSlop={10}
            onPress={() => Linking.openURL("https://www.linkedin.com/in/alicihansarac/")}
            style={({ pressed }) => [styles.iconCircle, pressed && styles.pressed]}
          >
            <Feather name="linkedin" size={20} color={colors.text} />
          </Pressable>

          <Pressable 
            hitSlop={10}
            onPress={() => Linking.openURL("https://github.com/acs027")}
            style={({ pressed }) => [styles.iconCircle, pressed && styles.pressed]}
          >
            <Feather name="github" size={20} color={colors.text} />
          </Pressable>

          <Pressable 
            hitSlop={10}
            onPress={() => Linking.openURL("https://medium.com/@alicihansarac")}
            style={({ pressed }) => [styles.iconCircle, pressed && styles.pressed]}
          >
            <Entypo name="medium" size={20} color={colors.text} />
          </Pressable>
        </View>

      </View>
      
      {/* Visual Separator - iOS Style Line */}
      <View style={[styles.bottomBar, { backgroundColor: colors.text, opacity: 0.1 }]} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 120, // Extra space for the ChatOverlay and ExpandableInfo
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
  },
  content: {
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mobileContent: {
    flexDirection: "column",
    gap: 32,
  },
  left: {
    gap: 4,
  },
  centerAlign: {
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 15,
    color: "#8E8E93",
    fontWeight: "500",
  },
  copyright: {
    fontSize: 12,
    color: "#636366",
    marginTop: 8,
  },
  right: {
    flexDirection: "row",
    gap: 16,
  },
  mobileGap: {
    gap: 20,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  pressed: {
    opacity: 0.7,
    scale: 0.95,
  },
  bottomBar: {
    height: 1,
    width: '40%',
    maxWidth: 200,
    marginTop: 40,
    alignSelf: 'center',
    borderRadius: 1,
  }
});