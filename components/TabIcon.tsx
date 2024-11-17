import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";

interface TabIconProps {
  icon: ImageSourcePropType; // Type for the image source
  color: string; // Type for the tintColor
  name: string; // Type for the tab name
  focused: boolean; // Type for the focused state
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
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
        style={{ width: "100%", textAlign: "center", color: color }} // Ensure text is centered and uses full width
        numberOfLines={1} // Optional: Remove truncation if needed
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;
