import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useThemeColors } from "../utils/useThemeColors";
import { ThemedView } from "../utils/ThemedView";
import { ThemedText } from "../utils/ThemedText";
import { Feather } from "@expo/vector-icons"; // for hamburger icon
import { useTranslation } from "react-i18next";
import i18n from "@/src/i18n";

type HeaderNavBarProps = {
  currentSection: string;
  onNavigate: (section: string) => void;
};

export default function HeaderNavBar({
  onNavigate,
  currentSection,
}: HeaderNavBarProps) {
  const { t } = useTranslation();
  const tabs = [
    { key: "about", label: t("navbar.tabs.about") },
    { key: "contributions", label: t("navbar.tabs.contributions") },
    { key: "projects", label: t("navbar.tabs.projects") },
    { key: "skills", label: t("navbar.tabs.skills") },
    { key: "contact", label: t("navbar.tabs.contact") },
  ];
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const isSmall = width < 768; // you can adjust this breakpoint

  const [menuOpen, setMenuOpen] = useState(false);

  // 🌍 Toggle Language (EN ↔ TR)
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "tr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <ThemedView color={colors.card} style={styles.container}>
      <Text style={styles.logo}>{t("navbar.logo")}</Text>

      <ThemedView style={styles.nav} color={colors.card}>
        {isSmall ? (
          <Pressable onPress={() => setMenuOpen((prev) => !prev)}>
            <Feather name="menu" size={24} color="#374151" />
          </Pressable>
        ) : (
          <ThemedView style={styles.nav} color={colors.card}>
            {tabs.map((tab) => {
              const isActive = currentSection === tab.key;

              return (
                <Pressable key={tab.key} onPress={() => onNavigate(tab.key)}>
                  <View style={styles.tabContainer}>
                    <ThemedText
                      style={[styles.navItem, isActive && styles.activeText]}
                    >
                      {tab.label}
                    </ThemedText>
                    {isActive && <View style={styles.indicator} />}
                  </View>
                </Pressable>
              );
            })}
          </ThemedView>
        )}

        <Pressable onPress={toggleLanguage} style={styles.langButton}>
          <Text style={styles.langText}>
            {i18n.language === "en" ? "TR" : "EN"}
          </Text>
        </Pressable>
      </ThemedView>

      {/* Dropdown menu for small screens */}
      {isSmall && menuOpen && (
        <ThemedView style={styles.dropdown} color={colors.card}>
          {tabs.map((tab) => (
            <Pressable
              key={tab.key}
              onPress={() => {
                onNavigate(tab.key.toLowerCase() as any);
                setMenuOpen(false);
              }}
            >
              <ThemedText style={styles.dropdownItem}>{tab.label}</ThemedText>
            </Pressable>
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    position: "relative",
    zIndex: 10,
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
  },
  nav: {
    flexDirection: "row",
    gap: 24,
  },
  navItem: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    top: 60,
    right: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    padding: 16,
  },
  dropdownItem: {
    fontSize: 16,
    paddingVertical: 8,
  },
  tabButton: {
    alignItems: "center",
    paddingVertical: 4,
  },

  tabContainer: {
    alignItems: "center",
  },
  activeText: {
    color: "#2563eb", // or any active color
    fontWeight: "bold",
  },
  indicator: {
    height: 3,
    width: "80%",
    backgroundColor: "#2563eb",
    marginTop: 4,
    borderRadius: 2,
  },
  // 🌍 Language switch button styles
  langButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#2563eb",
  },
  langText: {
    color: "white",
    fontWeight: "bold",
  },
});
