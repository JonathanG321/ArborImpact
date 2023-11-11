import { useState } from 'react';
import { LayoutRectangle, TouchableOpacity, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';
import { Project } from '../../lib/types';

interface Props extends CarouselRenderItemInfo<Project> {
  navigate: (
    screen: 'Project',
    params: {
      project: Project;
    }
  ) => void;
}

export default function ProjectsCarouselItem({ animationValue, item, navigate }: Props) {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  return (
    <View
      onLayout={(event) => {
        setLayout(event.nativeEvent.layout);
      }}
      className="h-full justify-center items-center overflow-hidden"
    >
      {layout ? (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            if (animationValue.value === 0) {
              navigate('Project', { project: item });
            }
          }}
        >
          <View className="pb-3" style={{ height: layout.height * 0.15, width: layout.width }}>
            <View className="bg-yellow-300 rounded-lg h-full w-full flex justify-center items-center">
              <Text className="text-5xl font-extrabold">{item.name}</Text>
            </View>
          </View>
          {!!item.projectImage ? (
            <Image
              source={{ ...item.projectImage }}
              style={{ height: layout.height * 0.85, width: layout.width }}
              accessibilityLabel="Project Image"
              className="rounded-md"
            />
          ) : (
            <View className="rounded-md max-w-full bg-[#333] border border-[#bcbcbc] w-48 h-48" />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
