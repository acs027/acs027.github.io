import React, { useState } from "react";
import { StyleSheet, useWindowDimensions, View, Pressable } from "react-native";
import { ThemedView } from "../utils/ThemedView";
import ProjectCard from "./ProjectCard";
import { ThemedText } from "../utils/ThemedText";
import { useThemeColors } from "../utils/useThemeColors";
import { projects } from "@/data/projects";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

interface ProjectsProps {
  onLayout?: () => void; // Add this prop
}

const Projects: React.FC<ProjectsProps> = ({ onLayout }) => {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll(!showAll);
    // Use requestAnimationFrame or setTimeout to wait for the next render cycle
    if (onLayout) {
      setTimeout(() => {
        onLayout(); 
      }, 100); 
    }
  };

  // Determine which projects to display
  const displayedProjects = showAll ? projects : projects.slice(0, 2);

  return (
    <ThemedView onLayout={onLayout} color={colors.background} style={styles.sectionContainer}>
      <View style={styles.header}>
        <ThemedText style={styles.sectionLabel}>FEATURED WORK</ThemedText>
        <ThemedText style={styles.mainTitle}>{t("projects.title")}</ThemedText>
      </View>

      <View style={styles.projectsGrid}>
        {displayedProjects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            title={t(`projects.${project.title}.title`)}
            description={t(`projects.${project.title}.description`)}
            techStack={project.techStack}
          />
        ))}
      </View>

      {projects.length > 2 && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.showMoreBtn,
              { backgroundColor: colors.card, borderColor: 'rgba(10, 132, 255, 0.3)' },
              pressed && styles.pressed
            ]}
            onPress={handleToggle}
          >
            <ThemedText style={styles.btnText}>
              {showAll ? t("projects.showLess") : t("projects.showMore")}
            </ThemedText>
            <Ionicons 
              name={showAll ? "chevron-up" : "chevron-down"} 
              size={18} 
              color="#0A84FF" 
            />
          </Pressable>
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 60,
    width: "100%",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 4,
    color: "#0A84FF",
    fontWeight: "700",
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1,
  },
  projectsGrid: {
    width: "95%",
    maxWidth: 1100,
    gap: 48, // Increased gap for a cleaner iOS spacing
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  showMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 1,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0A84FF",
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});

export default Projects;