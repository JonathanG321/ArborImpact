import { View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { WantsItemProps } from '../../lib/types';
import { cn } from '../../lib/utils';

export default function WantsItem({
  description,
  icon,
  type = 'ionicon',
  descriptionClassName,
  iconSize = 29,
  iconColor = 'black',
}: WantsItemProps) {
  return (
    <>
      <View className="w-1/12">
        <Icon type={type} name={icon} size={iconSize} color={iconColor} />
      </View>
      <View className="w-9/12 mb-2 mt-2">
        <Text className={cn('font-bold ml-2 font-bebas-neue text-md flex flex-wrap', descriptionClassName)}>
          {description}
        </Text>
      </View>
    </>
  );
}
