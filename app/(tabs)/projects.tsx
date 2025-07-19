import React, { useRef } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import CompactProjectCard from "@/components/CompactProjectCard";
import { projects } from "@/data/projects";
import Projects from "@/components/Projects";
import HomeScreen from ".";

export default function ProjectsScreen() {
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  document.title = "aCsPortfolio";

  return <HomeScreen section="projects" />;
  /*<>
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
        <View style={[styles.container]}>
          <Projects />
        </View>
      </ParallaxScrollView>
    </>*/
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  reactLogo: {
    height: 290,
    width: 290,
    position: "absolute",
    justifyContent: "center",
    opacity: 0.8,
  },
});
