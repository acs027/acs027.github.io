import { Text, Linking } from "react-native";

const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

function renderTextWithLinks(
  text: string,
  textColor: string,
  linkColor: string
) {
  return text.split(urlRegex).map((part, index) => {
    if (!part) return null;

    if (urlRegex.test(part)) {
      const url = part.startsWith("http")
        ? part
        : `https://${part}`;

      return (
        <Text
          key={index}
          style={{
            color: linkColor,
            textDecorationLine: "underline",
          }}
          onPress={() => Linking.openURL(url)}
        >
          {part}
        </Text>
      );
    }

    return (
      <Text key={index} style={{ color: textColor }}>
        {part}
      </Text>
    );
  });
}
export { renderTextWithLinks };