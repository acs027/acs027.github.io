import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import HomeScreen from ".";

export default function ProjectsScreen() {
  document.title = "aCs";

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
