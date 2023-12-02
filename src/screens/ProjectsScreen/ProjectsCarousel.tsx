import { useRef } from 'react';
import { Dimensions, ScaledSize, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Carousel from 'react-native-snap-carousel';
import { Project, RootDrawerParamList } from '../../../lib/types';
import ProjectsCarouselItem from './ProjectsCarouselItem';

const window: ScaledSize = Dimensions.get('window');

const PAGE_WIDTH = window.width;

type ProjectsProps = {
  projects: Project[];
};

export default function ProjectsCarousel({ projects }: ProjectsProps) {
  const ref = useRef(null);
  const { navigate } = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const itemSize = PAGE_WIDTH / 3 - 10;

  return (
    <View>
      <Carousel
        ref={ref}
        data={projects}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        fadingEdgeLength={0}
        sliderWidth={PAGE_WIDTH}
        slideStyle={{ height: itemSize, padding: 3 }}
        firstItem={1}
        itemWidth={itemSize}
        itemHeight={itemSize}
        useScrollView={true}
        renderItem={({ index, item }) => (
          <ProjectsCarouselItem key={item.name} index={index} item={item} navigate={navigate} />
        )}
      />
    </View>
  );
}
