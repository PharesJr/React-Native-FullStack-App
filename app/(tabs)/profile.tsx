import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { getUserPosts, signOut } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  // Validate user and pass userId to `getUserPosts`
  const { data: posts, refetch } = useAppwrite(() =>
    user?.$id ? getUserPosts({ userId: user.$id }) : Promise.resolve([])
  );

  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLogged(false)

    router.replace('/(auth)/login')
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full px-4 justify-center items-center mt-6 mb-12 ">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className="h-6 w-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="h-12 w-12 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[92%] h-[92%] rounded-lg "
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyle="mt-5"
              titleStyle="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyle="mr-10"
                titleStyle="text-xl"
              />
              <InfoBox title="1.2k" subtitle="Followers" titleStyle="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="No videos found for this search"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
