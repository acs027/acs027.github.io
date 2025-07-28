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

type HeaderNavBarProps = {
  currentSection: string;
  onNavigate: (section: string) => void;
};

export default function HeaderNavBar({
  onNavigate,
  currentSection,
}: HeaderNavBarProps) {
  const tabs = ["About", "Projects", "Skills", "Contact"];
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const isSmall = width < 768; // you can adjust this breakpoint

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ThemedView color={colors.card} style={styles.container}>
      <Text style={styles.logo}>aCs</Text>

      {isSmall ? (
        <Pressable onPress={() => setMenuOpen((prev) => !prev)}>
          <Feather name="menu" size={24} color="#374151" />
        </Pressable>
      ) : (
        <ThemedView style={styles.nav} color={colors.card}>
          {tabs.map((tab) => {
            const sectionKey = tab.toLowerCase() as
              | "about"
              | "projects"
              | "skills"
              | "contact";
            const isActive = currentSection === sectionKey;

            return (
              <Pressable key={tab} onPress={() => onNavigate(sectionKey)}>
                <View style={styles.tabContainer}>
                  <ThemedText
                    style={[styles.navItem, isActive && styles.activeText]}
                  >
                    {tab}
                  </ThemedText>
                  {isActive && <View style={styles.indicator} />}
                </View>
              </Pressable>
            );
          })}
        </ThemedView>
      )}

      {/* Dropdown menu for small screens */}
      {isSmall && menuOpen && (
        <ThemedView style={styles.dropdown} color={colors.card}>
          {tabs.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => {
                onNavigate(tab.toLowerCase() as any);
                setMenuOpen(false);
              }}
            >
              <ThemedText style={styles.dropdownItem}>{tab}</ThemedText>
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
});
