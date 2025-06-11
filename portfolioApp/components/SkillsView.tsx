import React from "react";
import { StyleSheet, Pressable, useColorScheme, Platform } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { SKILLS } from "@/constants/Skills";
import { ShadowStyle } from "./ShadowStyle";
import { useThemeColors } from "./useThemeColors";

const SkillsView: React.FC = () => {
  const colors = useThemeColors();

  return (
    <ThemedView color={colors.background} style={[styles.sectionContainer]}>
      <ThemedText type="subtitle">SKILLS</ThemedText>
      <ThemedView
        color={colors.card}
        style={[styles.roundedRect, ShadowStyle()]}
      >
        {SKILLS.map((category) => (
          <ThemedView
            color={colors.card}
            key={category.title}
            style={[styles.skillCategory]}
          >
            <ThemedText type="defaultSemiBold" style={styles.categoryTitle}>
              {category.title}
            </ThemedText>
            <ThemedView color={colors.card} style={[styles.skillContainer]}>
              <ThemedView color={colors.card} style={[styles.skillsGrid]}>
                {category.skills.map((skill) => {
                  if (!skill.Icon) return null;
                  const SkillIcon = skill.Icon;
                  return (
                    <Pressable
                      key={skill.name}
                      style={({ pressed, hovered }) => [
                        styles.skillBadge,
                        { backgroundColor: colors.skillBadgeBgColor },
                        pressed && styles.pressed,
                        hovered && [
                          styles.hovered,
                          { backgroundColor: colors.skillHoveredColor },
                        ], // Web hover effect
                      ]}
                    >
                      <SkillIcon size={32} />
                      <ThemedText style={[styles.skillText]}>
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
  roundedRect: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: "95%",
    maxWidth: 1000,
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
  },
  categoryTitle: {
    opacity: 0.8,
    marginBottom: 8,
  },
  skillBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    maxWidth: 200,
    minWidth: 100,
    height: 60,
    transition: "all 0.2s ease-in-out",
  },
  skillText: {
    fontWeight: "bold",
    textAlign: "right",
  },
  pressed: {
    opacity: 0.8, // Effect when pressed on mobile
  },
  hovered: {
    transform: [{ scale: 1.05 }], // Slightly increase size on hover
  },
});

export default SkillsView;
