import { Pressable, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { cn } from '../../lib/utils';
import { GestureResponderEvent } from 'react-native';

type Props = {
  textClassNames?: string;
  classNames?: string;
  text: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  disabled?: boolean;
};

export default function ButtonDisplay({ textClassNames, text, onPress, classNames, disabled = false }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={!!onPress ? 0.2 : 1}
      disabled={disabled}
      className={cn('py-3 items-center justify-center flex-1 bg-arbor-yellow rounded-lg px-2', classNames)}
      onPress={onPress}
    >
      <Text className={textClassNames}>{text}</Text>
    </TouchableOpacity>
  );
}
