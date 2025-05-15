import React from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { ExternalLink } from "./ExternalLink";
import { Platform } from "react-native";
import { GithubIcon } from "./icons/social/GithubIcon";
import { AppStoreDownloadSVG } from "./icons/social/AppStoreDownload";

type ProjectCardProps = {
  title: string;
  repoLink: string;
  appStoreLink?: string;
  description: string;
  techStack?: string[];
  images?: string[];
  gif?: string[];
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  repoLink,
  appStoreLink,
  description,
  techStack,
  images,
  gif,
}) => {
  const { width } = useWindowDimensions();
  return (
    <ThemedView style={styles.projectCard}>
      <ThemedView style={styles.projectContent}>
        <ThemedView>
          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <ThemedText type="title">{title}</ThemedText>

            <View style={{ flexDirection: "row", gap: 10 }}>
              {appStoreLink && (
                <ExternalLink href={appStoreLink}>
                  <AppStoreDownloadSVG size={50} />
                </ExternalLink>
              )}
              {repoLink && (
                <ExternalLink href={repoLink}>
                  <GithubIcon size={50} effectValue={1} />
                </ExternalLink>
              )}
            </View>
          </ThemedView>
        </ThemedView>

        <ThemedText>{description}</ThemedText>

        {techStack && (
          <ThemedView>
            <ThemedText type="defaultSemiBold">Tech Used</ThemedText>
            <ThemedText>{techStack.join(" ")}</ThemedText>
          </ThemedView>
        )}

        <ThemedView style={styles.projectImageContainer}>
          <ThemedView style={styles.deviceImagesContainer}>
            {images &&
              images.map((img, index) => {
                const isWebUri = typeof img === "string";
                const source = isWebUri ? { uri: img } : img; // img is already a require(...) object

                return (
                  <ThemedView key={index} style={styles.deviceImagesContent}>
                    <Image
                      source={source}
                      style={[
                        styles.deviceImage,
                        {
                          height: width < 450 ? 400 : 600,
                          width:
                            width < 450 ? (400 * 9) / 19.5 : (600 * 9) / 19.5,
                        },
                      ]}
                    />
                  </ThemedView>
                );
              })}
            {gif &&
              gif.map((src, index) => (
                <ThemedView key={index} style={styles.deviceImagesContent}>
                  <Image
                    source={typeof src === "string" ? { uri: src } : src}
                    style={[
                      styles.deviceGIF,
                      {
                        height: width < 450 ? 400 : 600,
                        width:
                          width < 450 ? (400 * 9) / 19.5 : (600 * 9) / 19.5,
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
    maxWidth: "95%",

    ...Platform.select({
      web: {
        boxShadow: "-1px -1px 5px 4px rgba(0, 0, 0, 0.5)",
      },
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
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
    // borderColor: Platform.select({
    //   ios: '#00000015',
    //   default: '#00000010',
    // }),
  },

  projectImageContainer: {
    alignItems: "center",
  },
});

export default ProjectCard;
