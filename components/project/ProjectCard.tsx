import React from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { ThemedView } from "../utils/ThemedView";
import { ThemedText } from "../utils/ThemedText";
import { ExternalLink } from "../utils/ExternalLink";
import { Platform } from "react-native";
import { GithubIcon } from "../icons/social/GithubIcon";
import { AppStoreDownloadSVG } from "../icons/social/AppStoreDownload";
import { ShadowStyle } from "../utils/ShadowStyle";
import { useThemeColors } from "../utils/useThemeColors";
import TestFlightButton from "../utils/TestFlightButton";

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
  title,
  repoLink,
  appStoreLink,
  testFlightLink,
  description,
  techStack,
  images,
  gif,
}) => {
  const { width } = useWindowDimensions();
  const colors = useThemeColors();
  return (
    <ThemedView
      color={colors.card}
      style={[
        styles.projectCard,
        ShadowStyle(),
        width < 1000 && { width: "95%" },
      ]}
    >
      <ThemedView color={colors.card} style={[styles.projectContent]}>
        <ThemedView>
          <ThemedView
            color={colors.card}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <ThemedText type="title">{title}</ThemedText>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                flexShrink: 0,
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
            >
              {appStoreLink && (
                <ExternalLink href={appStoreLink}>
                  <AppStoreDownloadSVG size={40} />
                </ExternalLink>
              )}

              {testFlightLink && (
                <TestFlightButton size={40} link={testFlightLink} />
              )}

              {repoLink && (
                <ExternalLink href={repoLink}>
                  <GithubIcon size={40} effectValue={1} />
                </ExternalLink>
              )}
            </View>
          </ThemedView>
        </ThemedView>

        <ThemedText>{description}</ThemedText>

        {techStack && (
          <ThemedView color={colors.card}>
            <ThemedText type="defaultSemiBold">Tech Used</ThemedText>
            <View style={styles.techStackContainer}>
              {techStack.map((tech, index) => (
                <View
                  key={index}
                  style={[
                    styles.techBadge,
                    { backgroundColor: colors.skillBadgeBgColor },
                  ]}
                >
                  <ThemedText style={styles.techBadgeText}>{tech}</ThemedText>
                </View>
              ))}
            </View>
          </ThemedView>
        )}

        <ThemedView color={colors.card} style={styles.projectImageContainer}>
          <ThemedView style={styles.deviceImagesContainer}>
            {images &&
              images.map((img, index) => {
                const isWebUri = typeof img === "string";
                const source = isWebUri ? { uri: img } : img; // img is already a require(...) object

                return (
                  <ThemedView
                    color={colors.card}
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
                  color={colors.card}
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
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  projectCard: {
    padding: 16,
    borderRadius: 12,
    width: 1000,
  },
  projectContent: {
    gap: 8,
    padding: 10,
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

  projectImageContainer: {
    alignItems: "center",
  },

  techStackContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },

  techBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#eee", // fallback
  },

  techBadgeText: {
    fontSize: 13,
  },
});

export default ProjectCard;
