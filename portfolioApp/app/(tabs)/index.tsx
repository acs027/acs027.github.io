import React, { useRef, useState } from "react";
import { Image, StyleSheet, Platform } from "react-native";
import Animated from "react-native-reanimated";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ExpandableInfo } from "@/components/ExpandableInfo";
import Projects from "@/components/Projects";
import SkillsView from "@/components/SkillsView";
import SocialView from "@/components/SocialView";
import AboutMe from "@/components/AboutMe";
import { Toast } from "@/components/Toast";

export default function HomeScreen() {
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const [showToast, setShowToast] = useState(false);
  document.title = "aCsPortfolio";

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
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
        <AboutMe />
        <SocialView setShowToast={setShowToast} />
        <SkillsView />
        <Projects />
      </ParallaxScrollView>

      <ExpandableInfo
        onPress={scrollToTop}
        name="Ali Cihan Saraç"
        location="Başiskele / Kocaeli"
        imageSource={require("@/assets/images/profile.png")}
      />

      <Toast
        message="Phone number copied to clipboard!"
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 290,
    width: 290,
    position: "absolute",
    justifyContent: "center",
    opacity: 0.8,
  },
});
