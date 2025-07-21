import React, { useState } from "react";
import { Pressable, StyleSheet, View, Animated } from "react-native";

type HoverableIconProps = {
  IconComponent: React.ComponentType<any>;
  name: string;
  size?: number;
  defaultColor: string;
  hoverColor: string;
};

export const HoverableIcon = ({
  IconComponent,
  name,
  size = 60,
  defaultColor,
  hoverColor,
}: HoverableIconProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={({ hovered: pressHovered }) => [
        styles.wrapper,
        {
          transform: [{ scale: hovered || pressHovered ? 1.1 : 1 }],
        },
      ]}
    >
      <IconComponent
        name={name}
        size={size}
        color={hovered ? hoverColor : defaultColor}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 8,
    transitionDuration: "200ms",
    transitionProperty: "transform",
  } as any,
});
