import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { cn } from '../../lib/utils';

type Props = { title: string; centered?: boolean; textClassNames?: string };

export default function Header({ title, centered = true, textClassNames }: Props) {
  return (
    <View className={cn('py-1 flex flex-row items-center', { 'items-start': !centered })}>
      <Text className={cn('font-extrabold text-xl mb-2 pr-[-8] w-11/12', textClassNames)}>{title}</Text>
    </View>
  );
}
