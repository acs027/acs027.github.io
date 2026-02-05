import * as React from "react";
import { StyleSheet, Clipboard, Platform } from "react-native";
import { ThemedView } from "../utils/ThemedView";
import { ExternalLink } from "../utils/ExternalLink";
import { useThemeColors } from "../utils/useThemeColors";
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { HoverableIcon } from "../utils/HoverableIcon";

interface SocialViewProps {
  setShowToast: (value: boolean) => void;
}

export default function SocialView() {

  const colors = useThemeColors();

  const socialFillColor = colors.socialIconFill;
  const socialIconHoverColor = colors.socialIconHoveredColor;

  return (
    <>
      <ThemedView color={colors.background} style={styles.connectGrid}>
        <ExternalLink href="mailto:alicihansarac@gmail.com">
          <HoverableIcon
            IconComponent={Entypo}
            name="mail-with-circle"
            size={54}
            defaultColor={socialFillColor}
            hoverColor={socialIconHoverColor}
          />
        </ExternalLink>

        <ExternalLink href="https://www.linkedin.com/in/alicihansarac/">
          <HoverableIcon
            IconComponent={Entypo}
            name="linkedin-with-circle"
            size={54}
            defaultColor={socialFillColor}
            hoverColor={socialIconHoverColor}
          />
        </ExternalLink>

        <ExternalLink href="https://github.com/acs027">
          <HoverableIcon
            IconComponent={AntDesign}
            name="github"
            size={54}
            defaultColor={socialFillColor}
            hoverColor={socialIconHoverColor}
          />
        </ExternalLink>

        <ExternalLink href="https://medium.com/@alicihansarac">
          <HoverableIcon
            IconComponent={Entypo}
            name="medium-with-circle"
            size={54}
            defaultColor={socialFillColor}
            hoverColor={socialIconHoverColor}
          />
        </ExternalLink>

        <ExternalLink href="https://apps.apple.com/us/developer/ali-cihan-sarac/id1800877163">
          <HoverableIcon
            IconComponent={Ionicons}
            name="logo-apple-appstore"
            size={54}
            defaultColor={socialFillColor}
            hoverColor={socialIconHoverColor}
          />
        </ExternalLink>
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  connectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  connectCard: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  connectIcon: {
    width: "100%",
    height: "100%",
  },
  cursorPointer: {
    cursor: "pointer",
  },
  pressed: {
    opacity: 0.8,
  },
});
