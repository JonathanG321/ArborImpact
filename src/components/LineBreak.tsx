import { View } from 'react-native';
import { cn } from '../../lib/utils';

export default function LineBreak({ classNames }: { classNames?: string }) {
  return <View className={cn('px-2 mb-2 w-full border-b-2 mx-2', classNames)} />;
}
