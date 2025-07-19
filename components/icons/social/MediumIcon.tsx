import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useState } from "react";
import { useColorScheme } from "react-native";

export function MediumIcon(props: {
  size?: number;
  color?: string;
  effectValue?: number;
  scale?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const size = hovered
    ? props.size * (props.effectValue || props.scale || 1.2) ||
      24 * (props.effectValue || props.scale || 1.2)
    : props.size || 24;
  const theme = useColorScheme();
  const color = hovered
    ? "#ff6347"
    : props.color || theme === "dark"
    ? "#fff"
    : "#000";
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 435.99998 436.00002"
      onMouseEnter={() => setHovered(true)} // Set hover state on mouse enter
      onMouseLeave={() => setHovered(false)} // Reset hover state on mouse leave
    >
      <Path
        fill={color}
        d="m 418.7,172.5 c -18.7,0.4 -29.9,22.8 -31.3,53.9 H 436 v -44.8 c -0.9,-1.3 -1.9,-2.5 -2.9,-3.5 -3.8,-3.6 -8.6,-5.5 -14.4,-5.6 z"
        id="path1"
      />
      <Path
        fill={color}
        d="m 386.6,235.1 c -1.9,34.1 19.3,62.3 47.1,64.3 0.8,0 1.5,0 2.3,0.1 V 235 h -49.4 z"
        id="path2"
      />
      <Path
        fill={color}
        d="m 417.4,335.7 c -44.4,0 -69.5,-37 -70.5,-83.3 0,-2.9 0,-5.8 0.1,-8.6 0,-0.6 0,-1.2 0,-1.7 0,-0.6 0,-1.2 0.1,-1.8 1.6,-20.5 8.2,-38.7 19.1,-52.1 6.8,-8.4 14.9,-14.7 24.1,-19 8.1,-4.1 19.4,-6.3 28.7,-6.3 h 0.4 c 5.7,0 11.3,0.6 16.6,1.8 v -93 C 436,32.1 403.9,0 364.3,0 H 71.7 C 32.1,0 0,32.1 0,71.7 V 364.3 C 0,403.9 32.1,436 71.7,436 h 292.6 c 39.6,0 71.7,-32.1 71.7,-71.7 v -30.9 c -5.7,1.6 -12,2.5 -18.7,2.5 z M 349,331 h -84.9 v -2.5 h 0.3 c 11,-2.6 17.1,-6.2 18.2,-17.8 V 138.3 l -81.8,192.3 h -4.5 L 116.8,143.5 v 162.9 c 0,14.8 6.2,18.9 18.3,21.6 h 0.3 v 2.6 H 86.7 v -2.5 H 87 c 12.2,-2.8 18.4,-6.9 18.4,-21.7 V 133.5 c 0,-14.8 -6.2,-18.9 -18.3,-21.6 h -0.3 v -2.6 h 71.8 l 61.9,145.5 61.9,-145.5 h 66.7 v 2.5 h -0.3 c -12.2,2.8 -18.3,6.9 -18.3,21.7 v 0 177.2 c 1.1,11.7 7.4,15.3 18.4,17.8 h 0.3 v 2.6 z"
        id="path3"
      />
    </Svg>
  );
}
