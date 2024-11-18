import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";

const TabIcon = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-5 h-5 mb-1"
      />
      <Text
        className={`${focused ? "font-bold" : "font-pregular"} text-xs`}
        style={{ width: "100%", textAlign: "center", color: color }}
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;
