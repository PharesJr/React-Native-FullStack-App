import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import VideoScreen from "./VideoPlayer";

// Define prop types for VideoCard component
interface VideoCardProps {
  video: {
    title: string;
    thumbnail: string;
    video: string; // URL or identifier for the video
    creator: {
      username: string;
      avatar: string; // URL for the creator's avatar
    };
  };
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [play, setPlay] = useState(false);

  const videoSource: string = String(video.video);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: video.creator.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {video.title}
            </Text>
            <Text
              className="text-gray-100 font-pregular text-xs"
              numberOfLines={1}
            >
              {video.creator.username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <VideoScreen videoSource={videoSource} styling="w-full h-60 rounded-xl" />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: video.thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
