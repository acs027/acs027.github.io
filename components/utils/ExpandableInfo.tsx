import { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  Pressable,
  Image,
  ImageSourcePropType,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  interpolate,
  withTiming,
  Extrapolate,
} from "react-native-reanimated";
import { IconSymbol } from "../ui/IconSymbol";
import { ThemedText } from "./ThemedText";

const BUTTON_SIZE = 60;
const HORIZONTAL_PADDING = 25;

interface Props {
  onPress: () => void;
  name: string;
  location: string;
  imageSource?: ImageSourcePropType;
}

export function ExpandableInfo({
  onPress,
  name,
  location,
  imageSource,
}: Props) {
  const expanded = useSharedValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    expanded.value = withSpring(isHovered ? 1 : 0, {
      damping: 18, // Slightly more dampened for a "heavy" premium feel
      stiffness: 120,
    });
  }, [isHovered]);

  const containerStyle = useAnimatedStyle(() => {
    const maxWidth = 260; 
    return {
      width: interpolate(expanded.value, [0, 1], [BUTTON_SIZE, maxWidth]),
      // Add a slight lift when expanded
      transform: [
        { translateY: interpolate(expanded.value, [0, 1], [0, -2]) },
        { scale: interpolate(expanded.value, [0, 1], [1, 1.02]) }
      ],
    };
  });

  const textContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(expanded.value, [0.4, 1], [0, 1], Extrapolate.CLAMP),
      transform: [
        { translateX: interpolate(expanded.value, [0, 1], [-10, 0]) },
      ],
    };
  });

  const handlePress = () => {
    // Mimic the "pop" effect of an iOS button
    onPress();
  };

  return (
    <View style={styles.anchor}>
      <Pressable
        onPress={handlePress}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        style={({ pressed }) => [
          styles.pressable,
          pressed && { transform: [{ scale: 0.96 }] }
        ]}
      >
        <Animated.View style={[styles.container, containerStyle]}>
          <View style={styles.innerContent}>
            {/* Profile Picture / Icon */}
            <View style={styles.imageWrapper}>
              {imageSource ? (
                <Image source={imageSource} style={styles.profileImage} />
              ) : (
                <IconSymbol
                  name="chevron.up.circle.fill"
                  size={32}
                  color="#0A84FF"
                />
              )}
            </View>

            {/* Expanded Text Section */}
            <Animated.View style={[styles.textWrapper, textContainerStyle]}>
              <ThemedText style={styles.nameText} numberOfLines={1}>
                {name}
              </ThemedText>
              <ThemedText style={styles.locationText} numberOfLines={1}>
                {location}
              </ThemedText>
            </Animated.View>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  anchor: {
    position: "absolute",
    left: HORIZONTAL_PADDING,
    bottom: HORIZONTAL_PADDING,
    zIndex: 1000,
  },
  pressable: {
    cursor: "pointer",
  },
  container: {
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    overflow: "hidden",
    backgroundColor: Platform.select({
      ios: "rgba(255, 255, 255, 0.7)",
      web: "rgba(255, 255, 255, 0.8)",
      default: "#FFFFFF",
    }),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.1)",
    ...Platform.select({
      web: {
        backdropFilter: "blur(12px)",
        boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.15)",
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  innerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20, // Space for the name to expand into
  },
  imageWrapper: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: BUTTON_SIZE - 4, // Slight inset
    height: BUTTON_SIZE - 4,
    borderRadius: (BUTTON_SIZE - 4) / 2,
  },
  textWrapper: {
    marginLeft: 4,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  locationText: {
    fontSize: 12,
    color: "#3A3A3C",
    opacity: 0.7,
  },
});