import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Project } from '../../lib/types';
import Avatar from './Avatar';

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
  return (
    <View className="h-full justify-center items-center overflow-hidden border border-gray-400">
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
          <Avatar
            image={{ ...item.projectImage }}
            accessibilityLabel="Project Image"
            classNames="relative top-0 left-0 h-full w-full rounded-none"
          />
        ) : (
          <View className="max-w-full bg-[#333] border border-[#bcbcbc] w-48 h-48" />
        )}
      </TouchableOpacity>
    </View>
  );
}
