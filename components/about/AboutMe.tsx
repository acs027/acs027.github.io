import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "../utils/ThemedView";
import { ThemedText } from "../utils/ThemedText";
import { HelloWave } from "../utils/HelloWave";
import { ShadowStyle } from "../utils/ShadowStyle";
import { useThemeColors } from "../utils/useThemeColors";
import { useTranslation } from "react-i18next";

const AboutMe: React.FC = () => {
  const colors = useThemeColors();
  const { t } = useTranslation();

  return (
    <ThemedView color={colors.background} style={styles.summaryContainer}>
      <ThemedView
        color={colors.card}
        style={[styles.roundedRect, ShadowStyle()]}
      >
        <ThemedView color={colors.card} style={[styles.titleContainer]}>
          <ThemedText type="title">
            {t("aboutMe.title_hi")}
            <HelloWave />
          </ThemedText>
          <ThemedText type="title">{t("aboutMe.title_name")}</ThemedText>
          <ThemedText type="subtitle">{t("aboutMe.title_role")}</ThemedText>
        </ThemedView>

        <ThemedView color={colors.card} style={[styles.sectionContainer]}>
          <ThemedText>{t("aboutMe.paragraph")}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 16,
    marginBottom: 24,
  },
  summaryContainer: {
    alignItems: "center",
  },
  roundedRect: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    alignItems: "baseline",
    width: "95%",
    maxWidth: 1000,
  },
  titleContainer: {
    alignItems: "baseline",
    gap: 8,
    marginBottom: 16,
  },
});

export default AboutMe;
