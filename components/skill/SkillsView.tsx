import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { ThemedView } from "../utils/ThemedView";
import { ThemedText } from "../utils/ThemedText";
import { SKILLS } from "@/constants/Skills";
import { useThemeColors } from "../utils/useThemeColors";
import { useTranslation } from "react-i18next";

const SkillsView: React.FC = () => {
  const colors = useThemeColors();
  const { t } = useTranslation();

  return (
    <ThemedView color={colors.background} style={styles.sectionContainer}>
      {/* Section Header */}
      <View style={styles.headerWrapper}>
        <ThemedText style={styles.sectionLabel}>TECHNICAL STACK</ThemedText>
        <ThemedText type="subtitle" style={styles.mainTitle}>{t("skills.title")}</ThemedText>
      </View>

      <View style={styles.masterGrid}>
        {SKILLS.map((category) => (
          <View key={category.title} style={styles.categoryCard}>
            <ThemedText type="defaultSemiBold" style={styles.categoryTitle}>
              {t(`skills.${category.title}`).toUpperCase()}
            </ThemedText>
            
            <View style={styles.skillsGrid}>
              {category.skills.map((skill) => {
                if (!skill.Icon) return null;
                const SkillIcon = skill.Icon;
                return (
                  <Pressable
                    key={skill.name}
                    style={({ pressed, hovered }) => [
                      styles.skillBadge,
                      { borderColor: 'rgba(255,255,255,0.1)' },
                      pressed && styles.pressed,
                      hovered && styles.hovered,
                    ]}
                  >
                    <View style={styles.iconWrapper}>
                      <SkillIcon size={20} color={colors.text} />
                    </View>
                    <ThemedText style={styles.skillText}>
                      {skill.name}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
  },
  headerWrapper: {
    alignItems: "center",
    marginBottom: 40,
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 4,
    color: "#007AFF", // iOS Blue
    fontWeight: "700",
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1,
    
  },
  masterGrid: {
    width: "100%",
    maxWidth: 1100,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  categoryCard: {
    backgroundColor: "rgba(28, 28, 30, 0.5)", // System Gray 6 (Dark)
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 500, // Two-column layout on wide screens
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  categoryTitle: {
    fontSize: 11,
    letterSpacing: 1.5,
    opacity: 0.5,
    marginBottom: 20,
    fontWeight: "bold",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  iconWrapper: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  skillText: {
    fontSize: 14,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  hovered: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderColor: "#007AFF",
  },
});

export default SkillsView;