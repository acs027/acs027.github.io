import * as React from "react";
import { useState } from "react";
import { StyleSheet, Clipboard, Platform } from "react-native";
import { ThemedView } from "./ThemedView";
import { ExternalLink } from "./ExternalLink";
import { Pressable } from "react-native";
import { Toast } from "./Toast";
import { PhoneIcon } from "./icons/social/PhoneIcon";
import { EmailIcon } from "./icons/social/EmailIcon";
import { LinkedinIcon } from "./icons/social/LinkedinIcon";
import { GithubIcon } from "./icons/social/GithubIcon";
import { useThemeColors } from "./useThemeColors";

interface SocialViewProps {
  setShowToast: (value: boolean) => void;
}

const SocialView: React.FC<SocialViewProps> = ({ setShowToast }) => {
  const handleCopyPhone = () => {
    const phoneNumber = "1";
    Clipboard.setString(phoneNumber);
    setShowToast(true);
  };

  const colors = useThemeColors();

  return (
    <>
      <ThemedView color={colors.background} style={styles.connectGrid}>
        <ExternalLink href="mailto:alicihansarac@gmail.com">
          <ThemedView color={colors.socialIconBg} style={styles.connectCard}>
            <EmailIcon size={32} />
          </ThemedView>
        </ExternalLink>

        <ExternalLink href="https://www.linkedin.com/in/alicihansarac/">
          <ThemedView color={colors.socialIconBg} style={styles.connectCard}>
            <LinkedinIcon size={32} />
          </ThemedView>
        </ExternalLink>

        <ExternalLink href="https://github.com/acs027">
          <ThemedView color={colors.socialIconBg} style={styles.connectCard}>
            <GithubIcon size={32} />
          </ThemedView>
        </ExternalLink>

        {/*
                <Pressable 
                    onPress={handleCopyPhone}
                    style={({ pressed }) => [
                        styles.connectCard,
                        pressed && styles.pressed,
                        styles.cursorPointer,
                    ]}
                >
                    <PhoneIcon size={32} />
                </Pressable>
                */}
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

export default SocialView;
