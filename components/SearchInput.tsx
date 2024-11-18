import {
    View,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
import { Image } from "react-native";
import { icons } from "@/constants";
  
  interface SearchInputProps extends TextInputProps {
    title: string; // `string` type for text props
    value: string; // `string` type for the input value
    placeholder: string; // `string` type for the placeholder
    handleChangedText: (text: string) => void; // Callback function for text change
    otherStyles?: string; // Optional additional styles (e.g., Tailwind class names)
  }
  
  const SearchInput: React.FC<SearchInputProps> = ({
    title,
    value,
    placeholder,
    handleChangedText,
    otherStyles = "",
    ...props
  }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false); // Manage focus state
  
    return (
        <View
          className={`w-full h-16 px-5 rounded-2xl flex-row items-center space-x-4 ${
            isFocused ? "border-2 border-secondary" : "border-2 border-black-200"
          } bg-black-100`}
        >
          <TextInput
            className="flex-1 text-white font-pregular text-base mt-0.5"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangedText}
            secureTextEntry={title === "Password" && !showPassword}
            onFocus={() => setIsFocused(true)} // Set focus state
            onBlur={() => setIsFocused(false)} // Reset focus state
            {...props} // Spread additional props to the TextInput
          />
          <TouchableOpacity>
            <Image source={icons.search} className="w-5 h-5" resizeMode="contain"/>
          </TouchableOpacity>
        </View>
    );
  };
  
  export default SearchInput;
  