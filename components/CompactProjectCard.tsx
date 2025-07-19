import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Platform,
  useColorScheme,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { ExternalLink } from "./ExternalLink";
import { GithubIcon } from "./icons/social/GithubIcon";
import { AppStoreDownloadSVG } from "./icons/social/AppStoreDownload";
import { useThemeColors } from "./useThemeColors";
import { ShadowStyle } from "./ShadowStyle";

type CompactProjectCardProps = {
  title: string;
  repoLink: string;
  appStoreLink?: string;
  techStack?: string[];
  thumbnail?: string | number;
  description?: string;
};

const CompactProjectCard: React.FC<CompactProjectCardProps> = ({
  title,
  repoLink,
  appStoreLink,
  techStack,
  thumbnail,
  description,
}) => {
  const colors = useThemeColors();
  return (
    <ThemedView color={colors.card} style={[styles.card, ShadowStyle()]}>
      {thumbnail && (
        <Image
          source={
            typeof thumbnail === "string" ? { uri: thumbnail } : thumbnail
          }
          style={styles.thumbnail}
        />
      )}
      <View style={styles.content}>
        <ThemedText type="subtitle">{title}</ThemedText>

        {techStack && (
          <View style={styles.stackContainer}>
            {techStack.map((tech, index) => (
              <ThemedView
                key={index}
                style={[
                  styles.techCapsule,
                  { backgroundColor: colors.skillBadgeBgColor },
                ]}
              >
                <ThemedText style={styles.techText}>{tech}</ThemedText>
              </ThemedView>
            ))}
          </View>
        )}

        {description && (
          <ThemedText style={styles.description}>{description}</ThemedText>
        )}

        <View style={styles.links}>
          {repoLink && (
            <ExternalLink href={repoLink}>
              <GithubIcon size={32} scale={1} />
            </ExternalLink>
          )}
          {appStoreLink && (
            <ExternalLink href={appStoreLink}>
              <AppStoreDownloadSVG size={32} />
            </ExternalLink>
          )}
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-end", // Align thumbnail & content to top
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    margin: 12,
    gap: 12,
    width: "95%",
    maxWidth: 450,

    ...Platform.select({
      web: {
        boxShadow: "0 3px 6px rgba(1,1,1,1.7)",
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  thumbnail: {
    width: 90,
    height: 195,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    position: "relative", // to position links absolutely inside
    minHeight: 195, // same height as thumbnail so links align bottom
    paddingRight: 10, // optional, for spacing on right
  },
  stack: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.8,
  },
  description: {
    marginTop: 6,
    fontSize: 12,
    opacity: 0.9,
    lineHeight: 15,
    marginBottom: 50,
  },
  links: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    gap: 10,
  },
  stackContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    marginTop: 6,
  },

  techCapsule: {
    paddingHorizontal: 8,
    borderRadius: 10,
  },

  techText: {
    fontSize: 11,
  },
});

export default CompactProjectCard;
