import { Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import React from "react";

// Define the types for the props
interface CustomButtonProps {
  title: string; // The title of the button
  handlepress: () => void; // The function to handle press events
  containerStyles?: string; // Optional custom styles for the button container (using classNames)
  textStyles?: string; // Optional custom styles for the text (using classNames)
  isLoading?: boolean; // Optional flag to indicate if the button is in a loading state
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlepress,
  containerStyles,
  textStyles,
  isLoading = false, // Default isLoading to false if not provided
}) => {
  return (
    <TouchableOpacity
      onPress={handlepress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[52px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
