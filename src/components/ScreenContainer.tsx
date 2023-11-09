import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { Dimensions, View } from 'react-native';

export default function ScreenContainer({ children }: PropsWithChildren) {
  const dimensions = Dimensions.get('window');
  return (
    <View className="p-3 pt-10 h-full">
      <LinearGradient
        style={{ height: dimensions.height, width: dimensions.width }}
        className="h-full z[-1] absolute top-0"
        colors={['#E5F0FF', '#fff']}
      />
      {children}
    </View>
  );
}
