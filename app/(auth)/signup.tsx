import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
      return; // Stop further execution if fields are missing
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        (error as any).message || "An unknown error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[80vh] justify-center px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white font-psemibold mt-10">
            Sign Up to Aora
          </Text>

          <FormField
            title="Username"
            placeholder="Enter your username"
            value={form.username}
            handleChangedText={(e) =>
              setForm({ ...form, username: e.toLowerCase() })
            }
            otherStyles="mt-10"
            keyboardType="email-address"
          />
          <FormField
            title="Email"
            placeholder="Enter your email"
            value={form.email}
            handleChangedText={(e) =>
              setForm({ ...form, email: e.toLowerCase() })
            }
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangedText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlepress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-100 text-lg font-pregular">
              Already have have an account?
            </Text>

            <Link
              href="/login"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default SignUp;
