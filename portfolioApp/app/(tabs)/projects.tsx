import React, { useRef } from "react";
import { Image, StyleSheet, Platform, View } from "react-native";
import Animated from "react-native-reanimated";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import CompactProjectCard from "@/components/CompactProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsScreen() {
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  document.title = "aCsPortfolio";

  return (
    <>
      <ParallaxScrollView
        ref={scrollViewRef}
        headerBackgroundColor={{ light: "#111", dark: "#000" }}
        headerImage={
          <Image
            source={require("@/assets/images/acslogo.png")}
            style={styles.reactLogo}
          />
        }
      >
        <View style={styles.grid}>
          {projects.map((project, index) => (
            <CompactProjectCard
              key={index}
              title={project.title}
              repoLink={project.repoLink}
              appStoreLink={project.appStoreLink}
              techStack={project.techStack}
              thumbnail={project.thumbnail}
              description={project.shortDescription} // <-- use shortDescription here
            />
          ))}
        </View>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  reactLogo: {
    height: 290,
    width: 290,
    // bottom: 0,
    // left: 0,
    position: "absolute",
    justifyContent: "center",
    opacity: 0.8,
  },
});
