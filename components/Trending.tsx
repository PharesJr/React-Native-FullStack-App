import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import VideoScreen from "./VideoPlayer";

interface TrendingItemProps {
  activeItem: any; // Replace `any` with the appropriate type if known
  item: any; // Replace `any` with the appropriate type if known
}

// Updated animations with compatible type
const zoomIn = {
  from: {
    transform: [{ scale: 0.9 }],
  },
  to: {
    transform: [{ scale: 1.1 }],
  },
};

const zoomOut = {
  from: {
    transform: [{ scale: 1 }],
  },
  to: {
    transform: [{ scale: 0.9 }],
  },
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);


  const videoSource: string = String(item.video);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut} // Compare with `id` since data has `id`
      duration={500}
    >
      {play ? (
        <VideoScreen videoSource={videoSource} styling="w-52 h-72" />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <ImageBackground
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

interface TrendingProps {
  posts: any;
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  // useRef ensures a stable reference for the viewableItemsChanged handler
  const onViewableItemsChangedRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  }).current;

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={onViewableItemsChangedRef}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
