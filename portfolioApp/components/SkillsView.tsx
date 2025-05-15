import React, { useState } from "react";
import { StyleSheet, Pressable, useColorScheme, Platform } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { SKILLS } from "@/constants/Skills";

const SkillsView: React.FC = () => {
  const theme = useColorScheme();
  return (
    <ThemedView style={styles.sectionContainer}>
      <ThemedText type="subtitle">SKILLS</ThemedText>
      <ThemedView
        style={
          theme === "dark" ? styles.darkRoundedRect : styles.lightRoundedRect
        }
      >
        {SKILLS.map((category) => (
          <ThemedView key={category.title} style={styles.skillCategory}>
            <ThemedText type="defaultSemiBold" style={styles.categoryTitle}>
              {category.title}
            </ThemedText>
            <ThemedView style={styles.skillContainer}>
              <ThemedView style={styles.skillsGrid}>
                {category.skills.map((skill) => {
                  if (!skill.Icon) return null;
                  const SkillIcon = skill.Icon;
                  return (
                    <Pressable
                      key={skill.name}
                      style={({ pressed, hovered }) => [
                        theme === "dark"
                          ? styles.darkSkillBadge
                          : styles.lightSkillBadge,
                        pressed && styles.pressed,
                        hovered && styles.hovered, // Web hover effect
                      ]}
                    >
                      <SkillIcon size={32} />
                      <ThemedText
                        style={
                          theme === "dark"
                            ? styles.darkSkillText
                            : styles.lightSkillText
                        }
                      >
                        {skill.name}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </ThemedView>
            </ThemedView>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    // gap: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  lightRoundedRect: {
    // backgroundColor: '#f0f0f0',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: 1000,
    maxWidth: "95%",

    ...Platform.select({
      web: {
        boxShadow: "0px 2px 4px rgba(0,0,0,0.5)",
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  darkRoundedRect: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: 1000,
    maxWidth: "95%",

    ...Platform.select({
      web: {
        // Use a white-ish box shadow for the light shadow effect
        boxShadow: "0px 2px 4px rgba(255, 255, 255, 0.5)",
      },
      ios: {
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  skillContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    width: "100%", // Ensures proper centering
    paddingBottom: 20,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center", // Ensures new rows start from the left
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center", // Helps in multi-line centering
  },
  skillCategory: {
    marginTop: 24,
    // alignItems: 'center',
  },
  categoryTitle: {
    opacity: 0.8,
    marginBottom: 8,
  },
  darkSkillBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    width: 210,
    height: 60,
    transition: "all 0.2s ease-in-out",
  },
  lightSkillBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
    backgroundColor: "#EEE8",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    width: 210,
    height: 60,
    transition: "all 0.2s ease-in-out",
  },
  darkSkillText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "right",
  },
  lightSkillText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "right",
  },
  pressed: {
    opacity: 0.8, // Effect when pressed on mobile
  },
  hovered: {
    transform: [{ scale: 1.05 }], // Slightly increase size on hover
    backgroundColor: "#f0f0f0", // Change background color on hover
  },
});

export default SkillsView;
