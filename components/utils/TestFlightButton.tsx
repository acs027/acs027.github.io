import React, { useState } from "react";
import { Pressable, View, Text, Linking } from "react-native";
import { ThemedText } from "@/components/utils/ThemedText"; // adjust if needed

type TestFlightButtonProps = {
  size?: number; // height in pixels, optional
  link: string;
};

export default function TestFlightButton({
  size = 40,
  link,
}: TestFlightButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onPress={() => {
        Linking.openURL(link);
      }}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={{
        backgroundColor: "#000000",
        paddingHorizontal: 8,
        height: size,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: isHovered ? "#ff6347" : "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <ThemedText
        style={{ color: isHovered ? "#ff6347" : "#ffffff", fontSize: 14 }}
      >
        Test in{" "}
        <ThemedText
          style={{
            fontWeight: "bold",
            color: isHovered ? "#ff6347" : "#ffffff",
            fontSize: 14,
          }}
        >
          TestFlight
        </ThemedText>
      </ThemedText>
    </Pressable>
  );
}
