import React, { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Animated from "react-native-reanimated";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ExpandableInfo } from "@/components/ExpandableInfo";
import Projects from "@/components/Projects";
import SkillsView from "@/components/SkillsView";
import SocialView from "@/components/SocialView";
import AboutMe from "@/components/AboutMe";
import { Toast } from "@/components/Toast";
import { useThemeColors } from "@/components/useThemeColors";

export default function HomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const projectViewRef = useRef<ScrollView>(null);
  const [showToast, setShowToast] = useState(false);
  const { height: screenHeight } = useWindowDimensions();
  const colors = useThemeColors();
  document.title = "aCsPortfolio";
  const [contentHeight, setContentHeight] = useState(0);

  const scrollToTop = () => {
    projectViewRef.current?.scrollTo();
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        pagingEnabled
        snapToInterval={screenHeight}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        snapToAlignment="center"
        scrollEventThrottle={16}
      >
        <View
          style={[
            styles.section,
            { backgroundColor: colors.background, height: 1250 },
          ]}
        >
          <Image
            source={require("@/assets/images/acslogo.png")}
            style={styles.reactLogo}
          />
          <AboutMe />
          <SocialView setShowToast={setShowToast} />
        </View>

        <View
          style={[
            styles.section,
            { backgroundColor: colors.background, height: 1250 },
          ]}
        >
          <SkillsView />
        </View>

        <View style={[styles.section, { backgroundColor: colors.background }]}>
          <ScrollView
            ref={projectViewRef}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            <Projects />
          </ScrollView>
        </View>
      </ScrollView>

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
    top: "10%",
    alignSelf: "center",
    opacity: 0.8,
    zIndex: -1,
  },
  section: {
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
