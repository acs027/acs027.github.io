import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { ExpandableInfo } from "@/components/utils/ExpandableInfo";
import Projects from "@/components/project/Projects";
import SkillsView from "@/components/skill/SkillsView";
import SocialView from "@/components/social/SocialView";
import AboutMe from "@/components/about/AboutMe";
import { Toast } from "@/components/utils/Toast";
import { useThemeColors } from "@/components/utils/useThemeColors";
import HeaderNavBar from "@/components/header/HeaderNavBar";
import Footer from "@/components/footer/Footer";
import Contact from "@/components/contact/Contact";
import ReactGA from "react-ga4";
import Contributions from "@/components/contributions/Contributions";
import ChatOverlay from "@/components/chatbot/ChatOverlay";

import "@/src/i18n";

export default function HomeScreen({ section }: { section?: string }) {
  const { width, height } = useWindowDimensions();
  const colors = useThemeColors();
  const scrollViewRef = useRef<ScrollView>(null);
  const isProgrammaticScroll = useRef(false);
  const [showToast, setShowToast] = useState(false);
  const [currentSection, setCurrentSection] = useState(section ?? "about");
  const sectionPositions = useRef<Record<string, number>>({});

  // Google Analytics Initialization
  useEffect(() => {
    if (Platform.OS === 'web') {
      ReactGA.initialize("G-HC71E8M7SR");
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
      document.title = "Ali Cihan Saraç | iOS Developer";
    }
  }, []);

  // ✅ Optimized Scroll Handler
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Ignore scroll events triggered by our own navigation animations
    if (isProgrammaticScroll.current) {
      return;
    }

    // On web, keep the active tab driven only by header navigation
    // and external section props to avoid mismatches caused by
    // dynamic layout changes (like expanding the Projects section).
    if (Platform.OS === "web") {
      return;
    }

    // Native: update the active section while the user scrolls.
    const y = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    // Use a point near the visual center of the viewport to decide
    // which section is "active".
    const focusY = y + layoutHeight * 0.35;

    const sortedSections = Object.entries(sectionPositions.current).sort(
      (a, b) => a[1] - b[1]
    );

    if (sortedSections.length === 0) {
      return;
    }

    // Find the last section whose top is above the focus point.
    let activeKey = sortedSections[0][0];
    for (const [key, pos] of sortedSections) {
      if (pos <= focusY) {
        activeKey = key;
      } else {
        break;
      }
    }

    if (activeKey !== currentSection) {
      setCurrentSection(activeKey);
    }
  };

  const scrollToSection = (sectionId: string) => {
    // Mark that the upcoming scroll is triggered programmatically so that
    // the scroll handler does not immediately override the active section.
    isProgrammaticScroll.current = true;
    setCurrentSection(sectionId);

    const clearProgrammaticFlag = () => {
      // Allow some time for the scroll animation to finish before re-enabling
      // scroll-based section detection.
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600);
    };

    // On web, prefer DOM-based scrolling so dynamic layout changes
    // (e.g. expanding the Projects section) are always respected.
    if (Platform.OS === "web") {
      try {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          clearProgrammaticFlag();
          return;
        }
      } catch {
        // If anything goes wrong, fall back to ScrollView-based scrolling.
      }
    }

    // Native / fallback: use cached layout positions.
    const position = sectionPositions.current[sectionId];
    if (position !== undefined) {
      scrollViewRef.current?.scrollTo({ y: position, animated: true });
    }
    clearProgrammaticFlag();
  };

  // Handle external navigation (e.g., from a URL param)
  useEffect(() => {
    if (section) {
      // Small timeout to ensure onLayout has finished
      setTimeout(() => scrollToSection(section), 100);
    }
  }, [section]);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  // ✅ Helper to capture layout
  const onSectionLayout = (name: string) => (e: any) => {
    sectionPositions.current[name] = e.nativeEvent.layout.y;
  };

  const isLargeScreen = width > 750;
  const sectionStyle = [
    styles.section,
    { backgroundColor: colors.background, minHeight: isLargeScreen ? undefined : undefined }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HeaderNavBar
        onNavigate={scrollToSection}
        currentSection={currentSection}
      />

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={32} // Balanced performance
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        stickyHeaderIndices={Platform.OS === 'web' ? [] : undefined}
      >
        {/* ✅ ABOUT */}
        <View nativeID="about" onLayout={onSectionLayout("about")} style={sectionStyle}>
          <Image
            source={require("@/assets/images/acslogo.png")}
            style={styles.reactLogo}
            contentFit="contain"
          />
          <AboutMe />
          {/* <SocialView setShowToast={setShowToast} /> */}
        </View>

        {/* ✅ PROJECTS */}
        <View nativeID="projects" onLayout={onSectionLayout("projects")} style={sectionStyle}>
          <Projects />
        </View>

        {/* ✅ CONTRIBUTIONS */}
        <View nativeID="contributions" onLayout={onSectionLayout("contributions")} style={sectionStyle}>
          <Contributions />
        </View>

        {/* ✅ SKILLS */}
        <View nativeID="skills" onLayout={onSectionLayout("skills")} style={sectionStyle}>
          <SkillsView />
        </View>

        {/* ✅ CONTACT */}
        <View nativeID="contact" onLayout={onSectionLayout("contact")} style={sectionStyle}>
          <Contact />
        </View>

        <Footer />
      </ScrollView>

      <ChatOverlay />

      {/* <ExpandableInfo
        onPress={scrollToTop}
        name="Ali Cihan Saraç"
        location="Kocaeli, TR"
        imageSource={require("@/assets/images/profile.png")}
      /> */}

      <Toast
        message="Copied to clipboard!"
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 300,
    width: 300,
    position: "absolute",
    top: "5%",
    alignSelf: "center",
    opacity: 0.05, // Subtle watermark look
    zIndex: -1,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 40, // Added padding for better mobile spacing
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});