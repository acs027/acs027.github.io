import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "../utils/ThemedView";
import { ThemedText } from "../utils/ThemedText";
import { useThemeColors } from "../utils/useThemeColors";
import ContributionCard from "./ContributionCard";
import { contributions } from "@/data/contributions";
import { useTranslation } from "react-i18next";

const Contributions: React.FC = () => {
  const colors = useThemeColors();
  const { t } = useTranslation();

  return (
    <ThemedView color={colors.background} style={[styles.sectionContainer]}>
      <ThemedText type="subtitle"> {t("contributions.title")}</ThemedText>
      <ThemedView color={colors.background} style={[styles.projectsContainer]}>
        {contributions.map((c, index) => (
          <ContributionCard
            key={index}
            title={c.title}
            titleUrl={c.repoLink}
            items={c.contributions}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 12,
    marginBottom: 50,
    alignItems: "center",
    width: 1000,
    maxWidth: "95%",
  },

  projectsContainer: {
    gap: 12,
    marginBottom: 24,
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Contributions;
