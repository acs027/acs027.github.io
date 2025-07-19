import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { ExpandableInfo } from "@/components/ExpandableInfo";
import Projects from "@/components/Projects";
import SkillsView from "@/components/SkillsView";
import SocialView from "@/components/SocialView";
import AboutMe from "@/components/AboutMe";
import { Toast } from "@/components/Toast";
import { useThemeColors } from "@/components/useThemeColors";
import HeaderNavBar from "@/components/HeaderNavBar";
import { useNavigation } from "expo-router";
import Footer from "@/components/Footer";

export default function HomeScreen({ section }: { section?: string }) {
  const scrollViewRef = useRef<ScrollView>(null);
  const projectViewRef = useRef<ScrollView>(null);
  const [showToast, setShowToast] = useState(false);
  const colors = useThemeColors();
  document.title = "aCsPortfolio";

  const aboutRef = useRef<View>(null);
  const skillsRef = useRef<View>(null);
  const projectsRef = useRef<View>(null);
  const contactRef = useRef<View>(null);

  const navigation = useNavigation();

  const [currentSection, setCurrentSection] = useState(section ?? "about");

  const sectionPositions = useRef<Record<string, number>>({});

  useEffect(() => {
    const refs = [
      { key: "about", ref: aboutRef },
      { key: "skills", ref: skillsRef },
      { key: "projects", ref: projectsRef },
      { key: "contact", ref: contactRef },
    ];

    setTimeout(() => {
      refs.forEach(({ key, ref }) => {
        ref.current?.measureLayout(
          scrollViewRef.current!.getInnerViewNode(),
          (x, y) => {
            sectionPositions.current[key] = y;
          },
          () => console.log("Measure failed:")
        );
      });
    }, 1000);
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
      // setCurrentSection(section); // Ensure indicator updates on tap
    }
  };

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, [navigation]);

  useEffect(() => {
    if (section === "projects") {
      handleNavigation(section);
    }
  }, [section]);

  const scrollToTop = () => {
    projectViewRef.current?.scrollTo();
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleNavigation = (section: string) => {
    console.log(section);
    const refMap: Record<string, React.RefObject<View>> = {
      about: aboutRef,
      skills: skillsRef,
      projects: projectsRef,
      contact: contactRef,
    };

    const ref = refMap[section];
    if (ref?.current && scrollViewRef.current) {
      ref.current.measureLayout(
        scrollViewRef.current.getInnerViewNode(),
        (x, y) => {
          scrollViewRef.current?.scrollTo({ y, animated: true });
        },
        () => console.warn()
      );
    }
  };

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
        snapToAlignment="center"
        scrollEventThrottle={16}
      >
        <View
          ref={aboutRef}
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
          ref={skillsRef}
          style={[
            styles.section,
            { backgroundColor: colors.background, height: 1250 },
          ]}
        >
          <SkillsView />
        </View>

        <View
          ref={projectsRef}
          style={[styles.section, { backgroundColor: colors.background }]}
        >
          <Projects />
        </View>
        <Footer />
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
