import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

interface SearchInputProps extends TextInputProps {
  initialQuery: any; // `string` type for text props
  value: string; // `string` type for the input value
  placeholder: string; // `string` type for the placeholder
  otherStyles?: string; // Optional additional styles (e.g., Tailwind class names)
}

const SearchInput: React.FC<SearchInputProps> = ({
  initialQuery,
  value,
  placeholder,
  otherStyles = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false); // Manage focus state
  const [query, setQuery] = useState(initialQuery || "");

  const pathname = usePathname();

  return (
    <View
      className={`w-full h-16 px-5 rounded-2xl flex-row items-center space-x-4 ${
        isFocused ? "border-2 border-secondary" : "border-2 border-black-200"
      } bg-black-100`}
    >
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#cdcde0"
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)} // Set focus state
        onBlur={() => setIsFocused(false)} // Reset focus state
        {...props} // Spread additional props to the TextInput
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please put something to search."
            );
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
