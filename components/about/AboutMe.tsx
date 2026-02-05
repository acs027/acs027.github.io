import React from "react";
import { StyleSheet, View, useWindowDimensions, Platform } from "react-native";
import { ThemedView } from "../utils/ThemedView";
import { ThemedText } from "../utils/ThemedText";
import { HelloWave } from "../utils/HelloWave";
import { useThemeColors } from "../utils/useThemeColors";
import { useTranslation } from "react-i18next";

const AboutMe: React.FC = () => {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  
  const isMobile = width < 768;
  const isSmallMobile = width < 480;

  return (
    <ThemedView 
      color={colors.background} 
      style={[
        styles.outerContainer, 
        isMobile && { 
          paddingVertical: 40,
          paddingBottom: isSmallMobile ? 60 : 40 // Extra bottom padding for small screens
        }
      ]}
    >
      <View style={[
        styles.contentWrapper, 
        isMobile && { 
          flexDirection: 'column', 
          gap: 30,
          width: '95%' // Slightly wider on mobile to use more space
        }
      ]}>
        
        {/* Left Side: Bold Intro */}
        <View style={[styles.introSide, isMobile && { alignItems: 'center', width: '100%' }]}>
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>IOS DEVELOPER</ThemedText>
          </View>
          
          <ThemedText style={[
            styles.heroTitle, 
            isMobile && { fontSize: 36, lineHeight: 42, textAlign: 'center' },
            isSmallMobile && { fontSize: 32, lineHeight: 38 }
          ]}>
            {t("aboutMe.title_hi")} <HelloWave />
          </ThemedText>
          
          <ThemedText style={[
            styles.heroTitleName, 
            isMobile && { fontSize: 36, lineHeight: 42, textAlign: 'center' },
            isSmallMobile && { fontSize: 32, lineHeight: 38 }
          ]}>
            {t("aboutMe.title_name")}
          </ThemedText>
          
          <ThemedText style={[
            styles.heroSubtitle, 
            isMobile && { textAlign: 'center', fontSize: 18 },
            isSmallMobile && { fontSize: 16 }
          ]}>
            Engineering Precision Meets Mobile Innovation.
          </ThemedText>
        </View>

        {/* Right Side: The Story Card */}
        <View style={[styles.storySide, isMobile && { width: '100%' }]}>
          <View style={[
            styles.glassCard, 
            { backgroundColor: 'rgba(28, 28, 30, 0.6)' },
            isMobile && { padding: 20, borderRadius: 24 },
            isSmallMobile && { padding: 16, borderRadius: 20 }
          ]}>
            <ThemedText style={[
              styles.paragraphText, 
              isMobile && { fontSize: 15, lineHeight: 24, marginBottom: 24 },
              isSmallMobile && { fontSize: 14, lineHeight: 22, marginBottom: 20 }
            ]}>
              {t("aboutMe.paragraph")}
            </ThemedText>
            
            {/* Quick Stats / Journey Tags */}
            <View style={[
              styles.journeyFooter, 
              isSmallMobile && { 
                flexDirection: 'column', 
                gap: 16,
                paddingTop: 16 
              }
            ]}>
              <View style={[
                styles.statBox,
                isSmallMobile && { paddingHorizontal: 0 }
              ]}>
                <ThemedText style={styles.statLabel}>BACKGROUND</ThemedText>
                <ThemedText style={styles.statValue}>Mechanical Eng.</ThemedText>
              </View>
              
              <View style={[
                styles.statBox, 
                !isSmallMobile && { 
                  borderLeftWidth: 1, 
                  borderColor: 'rgba(255,255,255,0.1)' 
                },
                isSmallMobile && { 
                  borderTopWidth: 1, 
                  borderColor: 'rgba(255,255,255,0.1)', 
                  paddingTop: 16,
                  paddingHorizontal: 0
                }
              ]}>
                <ThemedText style={styles.statLabel}>FOCUS</ThemedText>
                <ThemedText style={styles.statValue}>iOS Ecosystem</ThemedText>
              </View>
            </View>
          </View>
        </View>

      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: 80,
    width: "100%",
    alignItems: "center",
    minHeight: 'auto', // Ensure it can grow
  },
  contentWrapper: {
    width: "90%",
    maxWidth: 1100,
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
  },
  introSide: {
    flex: 1,
    alignItems: "flex-start",
  },
  badge: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 122, 255, 0.2)",
  },
  badgeText: {
    color: "#0A84FF",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: -1,
    lineHeight: 56,
  },
  heroTitleName: {
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: -1,
    lineHeight: 56,
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 20,
    color: "#A1A1A1",
    fontWeight: "500",
    maxWidth: 400,
  },
  storySide: {
    flex: 1.2,
  },
  glassCard: {
    borderRadius: 32,
    padding: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    ...Platform.select({
        web: {
            backdropFilter: 'blur(10px)',
        }
    })
  },
  paragraphText: {
    fontSize: 17,
    lineHeight: 28,
    color: "#D1D1D6",
    marginBottom: 32,
  },
  journeyFooter: {
    flexDirection: "row",
    paddingTop: 24,
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  statBox: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 4,
  },
  statLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: "#0A84FF",
    fontWeight: "700",
  },
  statValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default AboutMe;