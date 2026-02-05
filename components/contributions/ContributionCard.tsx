import React from "react";
import { Pressable, StyleSheet, View, useWindowDimensions, Platform, Linking } from "react-native";
import { ThemedText } from "../utils/ThemedText";
import { useThemeColors } from "../utils/useThemeColors";
import { Ionicons } from "@expo/vector-icons";

type ContributionCardProps = {
  title: string;
  titleUrl?: string;
  items: { label: string; url?: string }[];
};

export default function ContributionCard({ title, titleUrl, items }: ContributionCardProps) {
  const { width } = useWindowDimensions();
  const colors = useThemeColors();
  const isMobile = width < 768;

  const handlePress = () => {
    if (titleUrl) {
      if (Platform.OS === 'web') {
        window.open(titleUrl, "_blank");
      } else {
        Linking.openURL(titleUrl);
      }
    }
  };

  return (
    <Pressable 
      onPress={handlePress}
      style={({ pressed, hovered }) => [
        styles.cardBase,
        { 
          backgroundColor: "rgba(28, 28, 30, 0.4)", 
          borderColor: "rgba(255, 255, 255, 0.1)" 
        },
        Platform.OS === 'web' && hovered && styles.cardHovered,
        pressed && { transform: [{ scale: 0.98 }] }
      ]}
    >
      <View style={[styles.cardContent, isMobile && styles.mobileContent]}>
        
        {/* Left Side: Repo Branding */}
        <View style={[
          styles.leftSection, 
          isMobile && styles.mobileLeftSection
        ]}>
          <View style={styles.iconCircle}>
            <Ionicons name="git-branch-outline" size={24} color="#30D158" />
          </View>
          <View style={[styles.textBlock, isMobile && { alignItems: 'center' }]}>
            <ThemedText style={[
              styles.repoTitle, 
              isMobile && styles.mobileRepoTitle
            ]}>
              {title}
            </ThemedText>
            <ThemedText style={styles.subLabel}>Open Source Contributor</ThemedText>
          </View>
        </View>

        {/* Right Side: Contribution Details */}
        <View style={[
            styles.rightSection, 
            isMobile && styles.mobileRightSection
        ]}>
          {items.map((item, idx) => (
            <View key={idx} style={styles.contributionRow}>
              <View style={styles.dot} />
              <ThemedText style={[styles.contributionText, isMobile && { fontSize: 13 }]}>
                {item.label}
              </ThemedText>
            </View>
          ))}
        </View>

      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <View style={styles.footerInner}>
          <ThemedText style={styles.footerLink}>View Pull Request on GitHub</ThemedText>
          <Ionicons name="arrow-forward" size={14} color="rgba(255,255,255,0.4)" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardBase: {
    width: "100%",
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    overflow: "hidden",
    marginBottom: 16,
    ...Platform.select({
      web: {
        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }
    })
  },
  cardHovered: {
    borderColor: "rgba(48, 209, 88, 0.4)", 
    backgroundColor: "rgba(48, 209, 88, 0.08)",
    shadowColor: "#30D158",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mobileContent: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  mobileLeftSection: {
    flexDirection: 'column', // Stack icon on top of text
    alignItems: 'center',    // Center icon and text block
    flex: 0, 
    width: '100%',
  },
  textBlock: {
    flexShrink: 1,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "rgba(48, 209, 88, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(48, 209, 88, 0.2)",
  },
  repoTitle: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
    color: '#FFFFFF'
  },
  mobileRepoTitle: {
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 2,
  },
  subLabel: {
    fontSize: 10,
    color: "#30D158",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  rightSection: {
    flex: 1.4,
    paddingLeft: 24,
    borderLeftWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  mobileRightSection: {
    flex: 0, 
    width: '100%',
    paddingLeft: 0,
    borderLeftWidth: 0,
    borderTopWidth: 1,
    paddingTop: 20,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  contributionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#30D158",
    marginTop: 7,
  },
  contributionText: {
    fontSize: 14,
    color: "#A1A1AA",
    lineHeight: 20,
    flex: 1,
  },
  footer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  footerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: Platform.OS === 'web' ? 'flex-start' : 'center',
  },
  footerLink: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255,255,255,0.4)",
  }
});