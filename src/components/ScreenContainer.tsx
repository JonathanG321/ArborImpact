import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { View } from 'react-native';

export default function ScreenContainer({ children }: PropsWithChildren) {
  return (
    <LinearGradient className="h-full" colors={['#E5F0FF', '#fff']}>
      <View className="p-3 mt-10 h-full">{children}</View>
    </LinearGradient>
  );
}
