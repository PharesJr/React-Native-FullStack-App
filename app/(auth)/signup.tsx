import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const signup = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View>
        <Text className="text-white">Sign Up</Text>
      </View>
    </SafeAreaView>
  );
};

export default signup;
