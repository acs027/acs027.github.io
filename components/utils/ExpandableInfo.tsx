import { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  Dimensions,
  Pressable,
  Image,
  ImageSourcePropType,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  interpolate,
  withTiming,
} from "react-native-reanimated";
import { IconSymbol } from "../ui/IconSymbol";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const SCREEN_WIDTH = Dimensions.get("window").width;
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

  // Use effect to handle hover state changes
  useEffect(() => {
    expanded.value = withSpring(isHovered ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [isHovered]);

  const containerStyle = useAnimatedStyle(() => {
    const maxWidth = Math.max(SCREEN_WIDTH - HORIZONTAL_PADDING * 3, 380);
    return {
      width: interpolate(expanded.value, [0, 1], [BUTTON_SIZE, maxWidth]),
      height: BUTTON_SIZE,
      transform: [{ translateY: interpolate(expanded.value, [0, 1], [0, -4]) }],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: expanded.value,
      flex: 1,
      alignItems: "center",
      transform: [
        { translateX: interpolate(expanded.value, [0, 1], [-20, 0]) },
      ],
    };
  });

  const handlePress = () => {
    expanded.value = withTiming(1, { duration: 200 });
    setTimeout(() => {
      expanded.value = withTiming(0, { duration: 200 });
    }, 300);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <Animated.View style={[styles.container, containerStyle]}>
        <ThemedView style={styles.content}>
          {imageSource ? (
            <Image source={imageSource} style={styles.profileImage} />
          ) : (
            <IconSymbol
              name="chevron.up.circle.fill"
              size={32}
              color="#007AFF"
            />
          )}
          <Animated.View style={contentStyle}>
            <ThemedText type="defaultSemiBold">{name}</ThemedText>
            <ThemedText style={styles.location}>{location}</ThemedText>
          </Animated.View>
        </ThemedView>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    position: "absolute",
    left: HORIZONTAL_PADDING,
    bottom: HORIZONTAL_PADDING,
    cursor: "pointer",
    zIndex: 100,
  },
  pressed: {
    opacity: 0.8,
  },
  container: {
    backgroundColor: Platform.select({
      ios: "#FFFFFF99",
      default: "#FFFFFF95",
    }),
    borderRadius: BUTTON_SIZE / 2,
    overflow: "hidden",

    ...Platform.select({
      web: {
        backdropFilter: "blur(8px)", // web only
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    padding: 0,
    height: "100%",
  },
  location: {
    fontSize: 12,
    opacity: 0.6,
  },
  profileImage: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
});
