import { useState } from 'react';
import { LayoutRectangle, TouchableOpacity, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { Project } from '../../lib/types';

type CarouselItem = {
  item: Project;
  index: number;
};

interface Props extends CarouselItem {
  navigate: (
    screen: 'Project',
    params: {
      project: Project;
    }
  ) => void;
}

export default function ProjectsCarouselItem({ item, navigate }: Props) {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  return (
    <View
      onLayout={(event) => {
        setLayout(event.nativeEvent.layout);
      }}
      className="h-full justify-center items-center overflow-hidden border border-gray-400"
    >
      {layout ? (
        <TouchableOpacity
          activeOpacity={0.6}
          className="h-full w-full"
          onPress={() => {
            navigate('Project', { project: item });
          }}
        >
          <View className="bg-gray-500 opacity-50 h-full w-full absolute bottom-0 left-0 z-[1]" />
          <Text className="text-xl px-2 pb-1 text-white font-bold absolute bottom-0 left-0 z-[1]">{item.name}</Text>
          {!!item.projectImage ? (
            <Image
              source={{ ...item.projectImage }}
              style={{ height: layout.height, width: layout.width }}
              accessibilityLabel="Project Image"
              className="relative top-0 left-0"
            />
          ) : (
            <View className="max-w-full bg-[#333] border border-[#bcbcbc] w-48 h-48" />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
