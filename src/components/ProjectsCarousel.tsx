import { useRef } from 'react';
import { Dimensions, ScaledSize, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useHeaderHeight } from '@react-navigation/elements';
import { Project, RootDrawerParamList } from '../../lib/types';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import ProjectsCarouselItem from './ProjectsCarouselItem';

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
        renderItem={(props) => <ProjectsCarouselItem {...props} navigate={navigate} />}
      />
    </View>
  );
}
