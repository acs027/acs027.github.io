import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { ThemedView } from "../utils/ThemedView";
import ProjectCard from "./ProjectCard";
import { ThemedText } from "../utils/ThemedText";
import { useThemeColors } from "../utils/useThemeColors";
import { projects } from "@/data/projects";
import CompactProjectCard from "./CompactProjectCard";

const Projects: React.FC = () => {
  const colors = useThemeColors();
  const window = useWindowDimensions();

  return (
    <ThemedView color={colors.background} style={[styles.sectionContainer]}>
      <ThemedText type="subtitle">FEATURED PROJECTS</ThemedText>
      <ThemedView
        color={colors.background}
        style={[
          styles.projectsContainer,
          window.width < 450 && styles.compactProjectStyles,
        ]}
      >
        {projects.map((project, index) =>
          window.width > 450 ? (
            <ProjectCard
              key={index}
              {...project}
              techStack={project.techStack?.map((tech) => `• ${tech}`)}
            />
          ) : (
            <CompactProjectCard
              key={index}
              title={project.title}
              repoLink={project.repoLink}
              testFlightLink={project.testFlightLink}
              appStoreLink={project.appStoreLink}
              techStack={project.techStack}
              thumbnail={project.thumbnail}
              description={project.shortDescription}
            />
          )
        )}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 12,
    marginBottom: 50,
    alignItems: "center",
    width: "95%",
    maxWidth: 1000,
  },

  projectsContainer: {
    gap: 12,
    marginBottom: 24,
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row",
  },

  compactProjectStyles: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
});

export default Projects;
