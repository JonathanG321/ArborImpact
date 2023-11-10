import { useRef, useState } from 'react';
import { Dimensions, LayoutRectangle, Pressable, ScaledSize, TouchableOpacity, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import Carousel from 'react-native-reanimated-carousel';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useHeaderHeight } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';
import { Project, RootDrawerParamList } from '../../lib/types';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const window: ScaledSize = Dimensions.get('window');

const PAGE_WIDTH = window.width;
const PAGE_HEIGHT = window.height;

type Props = {
  projects: Project[];
};

export default function ProjectsCarousel({ projects }: Props) {
  const ref = useRef<ICarouselInstance>(null);
  const headerHeight = useHeaderHeight();
  const { navigate } = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  return (
    <View className="h-full">
      <Carousel
        height={PAGE_HEIGHT - headerHeight}
        width={PAGE_WIDTH}
        style={{ height: '100%', width: '100%' }}
        loop={false}
        vertical
        ref={ref}
        testID={'xxx'}
        autoPlay={false}
        autoPlayInterval={2000}
        snapEnabled
        pagingEnabled={false}
        data={projects}
        mode="parallax"
        modeConfig={{ parallaxScrollingOffset: 200 }}
        renderItem={({ item, animationValue }) => {
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
        }}
      />
    </View>
  );
}
