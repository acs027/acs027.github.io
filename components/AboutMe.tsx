import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { HelloWave } from "./HelloWave";
import { ShadowStyle } from "./ShadowStyle";
import { useThemeColors } from "./useThemeColors";

const AboutMe: React.FC = () => {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  return (
    <ThemedView color={colors.background} style={styles.summaryContainer}>
      <ThemedView
        color={colors.card}
        style={[styles.roundedRect, ShadowStyle()]}
      >
        <ThemedView color={colors.card} style={[styles.titleContainer]}>
          <ThemedText type="title">
            Hi! <HelloWave />
          </ThemedText>
          <ThemedText type="title">I'm Ali Cihan</ThemedText>
          <ThemedText type="subtitle">iOS Developer</ThemedText>
        </ThemedView>

        <ThemedView color={colors.card} style={[styles.sectionContainer]}>
          <ThemedText>
            Passionate iOS developer with a background in mechanical engineering
            and software development. I began programming during the pandemic
            with Harvard's CS50 and later specialized in Swift and iOS. Through
            personal projects and an internship at Tüpraş, I gained hands-on
            experience in frontend and backend development. I am eager to learn
            new technologies, adapt to challenges, and build high-quality
            applications.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 16,
    marginBottom: 24,
  },
  summaryContainer: {
    alignItems: "center",
  },
  roundedRect: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    alignItems: "baseline",
    width: "95%",
    maxWidth: 1000,
  },
  titleContainer: {
    alignItems: "baseline",
    gap: 8,
    marginBottom: 16,
  },
});

export default AboutMe;
