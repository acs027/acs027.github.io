import React from "react";
import { Dimensions, StyleSheet, useColorScheme, Platform } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { HelloWave } from "./HelloWave";

const AboutMe: React.FC = () => {
  const theme = useColorScheme();
  return (
    <ThemedView style={styles.summaryContainer}>
      <ThemedView
        style={
          theme === "dark" ? styles.darkRoundedRect : styles.lightRoundedRect
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            Hi! <HelloWave />
          </ThemedText>
          <ThemedText type="title">I'm Ali Cihan</ThemedText>
          <ThemedText type="subtitle">iOS Developer</ThemedText>
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText>
            Passionate iOS developer with a background in mechanical engineering
            and software development. I began programming during the pandemic
            with Harvard's CS50 and later specialized in Swift and iOS. Through
            personal projects and an internship at Tüpraş, I gained hands-on
            experience in frontend and backend development. I am eager to learn
            new technologies, adapt to challenges, and build high-quality
            applications in dynamic environments.
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
    // alignItems: 'center',
  },
  summaryContainer: {
    alignItems: "center",
  },
  lightRoundedRect: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    alignItems: "baseline",
    width: 1000,
    maxWidth: "95%",

    ...Platform.select({
      web: {
        boxShadow: "0px 2px 4px rgba(0,0,0,0.5)", // boxShadow for web
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
    alignItems: "baseline",
    width: 1000,
    maxWidth: "95%",

    ...Platform.select({
      web: {
        // white-ish shadow for dark background on web
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
  titleContainer: {
    // flexDirection: 'row',
    alignItems: "baseline",
    gap: 8,
    marginBottom: 16,
  },
});

export default AboutMe;
