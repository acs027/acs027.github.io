import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from "react-native";
import { ExpandableInfo } from "@/components/utils/ExpandableInfo";
import Projects from "@/components/project/Projects";
import SkillsView from "@/components/skill/SkillsView";
import SocialView from "@/components/social/SocialView";
import AboutMe from "@/components/about/AboutMe";
import { Toast } from "@/components/utils/Toast";
import { useThemeColors } from "@/components/utils/useThemeColors";
import HeaderNavBar from "@/components/header/HeaderNavBar";
import { useNavigation } from "expo-router";
import Footer from "@/components/footer/Footer";
import Contact from "@/components/contact/Contact";
import ReactGA from "react-ga4";
import Contributions from "@/components/contributions/Contributions";
import ChatOverlay from "@/components/chatbot/ChatOverlay";

import "@/src/i18n";

export default function HomeScreen({ section }: { section?: string }) {
  const { width, height } = useWindowDimensions();

  const scrollViewRef = useRef<ScrollView>(null);
  const projectViewRef = useRef<ScrollView>(null);

  const [showToast, setShowToast] = useState(false);
  const colors = useThemeColors();
  document.title = "aCsPortfolio";

  const navigation = useNavigation();

  // ✅ REFS
  const aboutRef = useRef<View>(null);
  const skillsRef = useRef<View>(null);
  const contributionsRef = useRef<View>(null);
  const projectsRef = useRef<View>(null);
  const contactRef = useRef<View>(null);

  // ✅ Current section logic
  const [currentSection, setCurrentSection] = useState(section ?? "about");

  const sectionPositions = useRef<Record<string, number>>({});

  // Google Analytics
  useEffect(() => {
    ReactGA.initialize("G-HC71E8M7SR");
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const buffer = 100;

    const current = Object.entries(sectionPositions.current)
      .reverse()
      .find(([_, pos]) => y + buffer >= pos);

    if (current && current[0] !== currentSection) {
      setCurrentSection(current[0]);
    }
  };

  const scrollToSection = (section: string) => {
    const position = sectionPositions.current[section];
    if (position !== undefined) {
      scrollViewRef.current?.scrollTo({ y: position, animated: true });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, [navigation]);

  useEffect(() => {
    if (section === "projects") {
      scrollToSection("projects");
    }
  }, [section]);

  const scrollToTop = () => {
    projectViewRef.current?.scrollTo();
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  // ✅ COMMON STYLES
  const fullHeight = width > 750 ? height : undefined;

  return (
    <>
      <HeaderNavBar
        onNavigate={scrollToSection}
        currentSection={currentSection}
      />

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEventThrottle={16}
      >
        {/* ✅ ABOUT */}
        <View
          ref={aboutRef}
          onLayout={(e) => {
            sectionPositions.current["about"] = e.nativeEvent.layout.y;
          }}
          style={[
            styles.section,
            { backgroundColor: colors.background, minHeight: fullHeight },
          ]}
        >
          <Image
            source={require("@/assets/images/acslogo.png")}
            style={styles.reactLogo}
          />
          <AboutMe />
          <SocialView setShowToast={setShowToast} />
        </View>

        {/* ✅ CONTRIBUTIONS */}
        <View
          ref={contributionsRef}
          onLayout={(e) => {
            sectionPositions.current["contributions"] = e.nativeEvent.layout.y;
          }}
          style={[
            styles.section,
            { backgroundColor: colors.background, minHeight: fullHeight },
          ]}
        >
          <Contributions />
        </View>

        {/* ✅ PROJECTS */}
        <View
          ref={projectsRef}
          onLayout={(e) => {
            sectionPositions.current["projects"] = e.nativeEvent.layout.y;
          }}
          style={[
            styles.section,
            { backgroundColor: colors.background, minHeight: fullHeight },
          ]}
        >
          <Projects />
        </View>

        {/* ✅ SKILLS */}
        <View
          ref={skillsRef}
          onLayout={(e) => {
            sectionPositions.current["skills"] = e.nativeEvent.layout.y;
          }}
          style={[
            styles.section,
            { backgroundColor: colors.background, minHeight: fullHeight },
          ]}
        >
          <SkillsView />
        </View>

        {/* ✅ CONTACT */}
        <View
          ref={contactRef}
          onLayout={(e) => {
            sectionPositions.current["contact"] = e.nativeEvent.layout.y;
          }}
          style={[
            styles.section,
            { backgroundColor: colors.background, minHeight: fullHeight },
          ]}
        >
          <Contact />
        </View>

        <Footer />
      </ScrollView>

      {/* ✅ CHAT */}
      <ChatOverlay />

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
