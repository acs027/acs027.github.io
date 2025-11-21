import React from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { ThemedView } from "../utils/ThemedView";
import { ShadowStyle } from "../utils/ShadowStyle";
import { useThemeColors } from "../utils/useThemeColors";
import ContributionGraph from "./OpenSourceTimeline";

type ContributionCardProps = {
  title: string;
  titleUrl?: string;
  items: { label: string; url?: string }[];
};

export default function ContributionCard({
  title,
  titleUrl,
  items,
}: ContributionCardProps) {
  const { width } = useWindowDimensions();
  const colors = useThemeColors();

  return (
    <ThemedView
      color={colors.card}
      style={[styles.card, ShadowStyle(), width < 1000 && { width: "95%" }]}
    >
      <Pressable onPress={() => titleUrl && window.open(titleUrl, "_blank")}>
        <ThemedView color={colors.card} style={styles.content}>
          {/* Pass ALL props to the graph */}
          <ContributionGraph title={title} titleUrl={titleUrl} items={items} />
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
  },
  content: {
    gap: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
