import { Pressable, View } from 'react-native';
import { Text } from 'react-native-elements';
import { cn } from '../../lib/utils';
import { GestureResponderEvent } from 'react-native';

type Props = {
  textClassNames?: string;
  classNames?: string;
  text: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
};

export default function TwinDisplay({ textClassNames, text, onPress, classNames }: Props) {
  return (
    <View className={cn('py-3 items-center w-5/12', classNames)}>
      <Pressable onPress={onPress}>
        <Text className={textClassNames}>{text}</Text>
      </Pressable>
    </View>
  );
}
