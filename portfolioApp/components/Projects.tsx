import React from "react";
import { StyleSheet, TextComponent } from "react-native";
import { ThemedView } from "./ThemedView";
import ProjectCard from "./ProjectCard";
import { ThemedText } from "./ThemedText";
import { useThemeColors } from "./useThemeColors";
import { projects } from "@/data/projects";

const Projects: React.FC = () => {
  const colors = useThemeColors();
  return (
    <ThemedView color={colors.background} style={[styles.sectionContainer]}>
      <ThemedText type="subtitle">FEATURED PROJECTS</ThemedText>

      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          {...project}
          techStack={project.techStack?.map((tech) => `• ${tech}`)}
        />
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 12,
    marginBottom: 24,
    alignItems: "center",
  },
});

export default Projects;
