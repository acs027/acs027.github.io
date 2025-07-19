import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function FirebaseIcon(props: { size?: number }) {
  const size = props.size || 24;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
    >
      <Path fill="#ffa000" d="M17.474 103.276 33.229 2.462a2.91 2.91 0 0 1 5.44-.924l16.294 30.39 6.494-12.366a2.91 2.91 0 0 1 5.15 0l43.97 83.714H17.474Z" />
      <Path fill="#f57c00" d="M71.903 64.005 54.955 31.913l-37.481 71.363Z" />
      <Path fill="#ffca28" d="M110.577 103.276 98.51 28.604a2.913 2.913 0 0 0-1.984-2.286 2.906 2.906 0 0 0-2.94.714l-76.112 76.243 42.115 23.618a8.728 8.728 0 0 0 8.51 0l42.478-23.618Z" />
    </Svg>
  );
} 