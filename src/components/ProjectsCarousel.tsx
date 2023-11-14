import { useRef } from 'react';
import { Dimensions, ScaledSize, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Carousel from 'react-native-snap-carousel';
import { Project, RootDrawerParamList } from '../../lib/types';
import ProjectsCarouselItem from './ProjectsCarouselItem';

const window: ScaledSize = Dimensions.get('window');

const PAGE_WIDTH = window.width;

type ProjectsProps = {
  projects: Project[];
};

export default function ProjectsCarousel({ projects }: ProjectsProps) {
  const ref = useRef(null);
  const { navigate } = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  return (
    <View>
      <Carousel
        ref={ref}
        data={projects}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        fadingEdgeLength={50}
        sliderWidth={PAGE_WIDTH}
        slideStyle={{ height: 130, padding: 3 }}
        firstItem={1}
        itemWidth={130}
        useScrollView={true}
        renderItem={({ index, item }) => (
          <ProjectsCarouselItem key={item.name} index={index} item={item} navigate={navigate} />
        )}
      />
    </View>
  );
}
