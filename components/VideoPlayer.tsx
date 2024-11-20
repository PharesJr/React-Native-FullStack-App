import React from "react";
import { Button, View } from "react-native";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";

type VideoScreenProps = {
  videoSource: string;
  styling: string
};

const VideoScreen: React.FC<VideoScreenProps> = ({ videoSource, styling }) => {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View className="flex-1 p-4 items-center justify-center">
      <VideoView
        className={styling}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View className="p-4">
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
    </View>
  );
};

export default VideoScreen;
