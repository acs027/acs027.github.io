import React from "react";
import { StyleSheet, useWindowDimensions, View, Platform, Pressable } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "../utils/ThemedText";
import { ExternalLink } from "../utils/ExternalLink";
import { useThemeColors } from "../utils/useThemeColors";
import TestFlightButton from "../utils/TestFlightButton";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "../utils/ThemedView";

type ProjectCardProps = {
  title: string;
  repoLink: string;
  appStoreLink?: string;
  testFlightLink?: string;
  description: string;
  techStack?: string[];
  images?: string[];
  gif?: string[];
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title, repoLink, appStoreLink, testFlightLink, description, techStack, images, gif
}) => {
    const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const isMobile = width < 600;

  // Combine media
  const mainMedia = gif?.[0] || images?.[0];

  return (
    <View style={styles.cardContainer}>
      <Pressable 
        style={({ pressed, hovered }) => [
          styles.bentoCard,
          hovered && Platform.OS === 'web' && styles.cardHovered,
          pressed && { transform: [{ scale: 0.98 }] }
        ]}
      >
        {/* Visual Top Section - Clean Single Background Color */}
        {/* <View style={styles.mediaContainer}>
          <View style={styles.phoneMockup}> */}
               <ThemedView style={styles.deviceImagesContainer}>
            {images &&
              images.map((img, index) => {
                const isWebUri = typeof img === "string";
                const source = isWebUri ? { uri: img } : img; // img is already a require(...) object

                return (
                  <ThemedView
                    color={colors.background}
                    key={index}
                    style={styles.deviceImagesContent}
                  >
                    <Image
                      source={source}
                      style={[
                        styles.deviceImage,
                        {
                          height: width <= 750 ? 200 : 400,
                          width:
                            width < 750 ? (200 * 9) / 19.5 : (400 * 9) / 19.5,
                        },
                      ]}
                      
                    />
                  </ThemedView>
                );
              })}
            {gif &&
              gif.map((src, index) => (
                <ThemedView
                  color={colors.background}
                  key={index}
                  style={styles.deviceImagesContent}
                >
                  <Image
                    source={typeof src === "string" ? { uri: src } : src}
                    style={[
                      styles.deviceGIF,
                      {
                        height: width <= 750 ? 200 : 400,
                        width:
                          width < 750 ? (200 * 9) / 19.5 : (400 * 9) / 19.5,
                      },
                    ]}
                  />
                </ThemedView>
              ))}
          </ThemedView>
          {/* </View>
        </View> */}

        {/* Content Bottom Section */}
        <View style={styles.contentSection}>
          <View style={styles.techWrapper}>
            {techStack?.map((tech, i) => (
              <View key={i} style={styles.skillTag}>
                <ThemedText style={styles.skillTagText}>{tech}</ThemedText>
              </View>
            ))}
          </View>

          <ThemedText style={styles.projectTitle}>{title}</ThemedText>
          <ThemedText style={styles.descriptionText}>{description}</ThemedText>

          <View style={styles.footer}>
            <ExternalLink href={repoLink || "#"} style={styles.caseStudyLink}>
              <ThemedText style={styles.caseStudyText}>
                {repoLink ? "View Source →" : "Case Study →"}
              </ThemedText>
            </ExternalLink>
            
            <View style={styles.iconGroup}>
              {testFlightLink && <TestFlightButton size={24} link={testFlightLink} />}
              {appStoreLink && (
                <ExternalLink href={appStoreLink}>
                  <Ionicons name="logo-apple" size={22} color="#636366" />
                </ExternalLink>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    marginBottom: 20,
  },
  bentoCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: 'rgba(28, 28, 30, 0.7)',
    overflow: "hidden",
    ...Platform.select({
      web: {
        backdropFilter: 'blur(12px)',
        transition: 'all 0.4s ease',
      }
    })
  },
  cardHovered: {
    borderColor: "#007AFF", 
    transform: [{ translateY: -5 }],
  },
  mediaContainer: {
    height: 280, 
    
    backgroundColor: "#09090b", // Pure Zinc-950 background
    alignItems: 'center',
    justifyContent: 'center', // Centered alignment
    overflow: 'hidden',
  },
  phoneMockup: {
    // width: 150, // More prominent frame
    aspectRatio: 1/2, // Taller aspect ratio for modern phones
    height: 300,
    
    backgroundColor: "#18181b", 
    borderRadius: 36, 
    // borderWidth: 3,
    borderColor: "#27272a", 
    marginTop: 100, // Pushes it "down" so it stays partially hidden at bottom
    zIndex: 2,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
  },
  screenshot: {
    width: '100%',
    height: '100%',
  },
  contentSection: {
    padding: 24,
  },
  techWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  skillTag: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  skillTagText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#A1A1AA", 
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  caseStudyLink: {
    paddingVertical: 4,
  },
  caseStudyText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#007AFF", // Target UI iOS Blue
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
    deviceImagesContainer: {
    marginVertical: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  deviceImagesContent: {
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  deviceImage: {
    aspectRatio: 1 / 2,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Platform.select({
      ios: "#00000015",
      default: "#00000010",
    }),
  },
  deviceGIF: {
    aspectRatio: 9 / 19.5,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default ProjectCard;