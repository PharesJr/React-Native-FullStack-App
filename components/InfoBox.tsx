import { View, Text } from "react-native";
import React from "react";

// Destructure props correctly
const InfoBox = ({
  title,
  subtitle,
  containerStyle,
  titleStyle,
}: {
  title: string;
  subtitle: string;
  containerStyle?: string;
  titleStyle?: string;
}) => {
  return (
    <View className={containerStyle}>
      <Text className={`text-white text-center font-psemibold ${titleStyle}`}>
        {title}
      </Text>
      <Text className={`text-gray-100 text-center font-lregular ${titleStyle}`}>
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
