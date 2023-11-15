import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';

interface Props extends PropsWithChildren {
  scrollable?: boolean;
}

export default function ScreenContainer({ children, scrollable }: Props) {
  const dimensions = Dimensions.get('window');
  return (
    <View className="h-full">
      <LinearGradient
        style={{ height: dimensions.height, width: dimensions.width }}
        className="h-full z[-1] absolute top-0"
        colors={['#E5F0FF', '#fff']}
      />
      <ScrollView scrollEnabled={!!scrollable}>
        <View className="p-3 pt-10">{children}</View>
      </ScrollView>
    </View>
  );
}
