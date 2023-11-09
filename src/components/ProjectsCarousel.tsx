import { useRef, useState } from 'react';
import { Dimensions, LayoutRectangle, ScaledSize, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import Carousel from 'react-native-reanimated-carousel';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useHeaderHeight } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';
import { Project } from '../../lib/types';

const window: ScaledSize = Dimensions.get('window');

const PAGE_WIDTH = window.width;
const PAGE_HEIGHT = window.height;

type Props = {
  projects: Project[];
};

export default function ProjectsCarousel({ projects }: Props) {
  const ref = useRef<ICarouselInstance>(null);
  const headerHeight = useHeaderHeight();

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
        renderItem={({ item }) => {
          const [layout, setLayout] = useState<LayoutRectangle | null>(null);
          console.log(layout);
          return (
            <View
              onLayout={(event) => {
                setLayout(event.nativeEvent.layout);
              }}
              className="h-full justify-center items-center overflow-hidden"
            >
              {layout ? (
                <>
                  <View className="pb-3 w-full" style={{ height: layout.height * 0.15 }}>
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
                </>
              ) : null}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
