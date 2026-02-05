import React from "react";
import { StyleSheet, View } from "react-native";
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
    <ThemedView color={colors.background} style={styles.sectionContainer}>
      <View style={styles.headerWrapper}>
        <ThemedText style={styles.sectionLabel}>COMMUNITY</ThemedText>
        <ThemedText type="subtitle" style={styles.mainTitle}>{t("contributions.title")}</ThemedText>
      </View>
      
      <View style={styles.projectsContainer}>
        {contributions.map((c, index) => (
          <ContributionCard
            key={index}
            title={c.title}
            titleUrl={c.repoLink}
            items={c.contributions}
          />
        ))}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 40,
    alignItems: "center",
    width: "100%",
  },
  headerWrapper: {
    alignItems: "center", // Centered children (the labels)
    justifyContent: "center",
    marginBottom: 32,
    width: "100%", // Ensure wrapper spans the container width
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 4,
    color: "#30D158",
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center", // Explicitly center the text
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1,
    textAlign: "center", // This is the crucial fix
    paddingHorizontal: 20, // Prevents text touching edges on small screens
  },
  projectsContainer: {
    width: "100%",
    maxWidth: 1000,
    gap: 16,
    paddingHorizontal: 20,
  },
});

export default Contributions;
