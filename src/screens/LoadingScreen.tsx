import { ActivityIndicator, View } from 'react-native';
import { Text } from 'react-native-elements';

export default function LoadingScreen() {
  return (
    <View className="absolute z-10 top-0 left-0 right-0 bottom-0 flex items-center justify-center h-full w-full bg-white">
      <Text className="text-3xl font-bold mb-5">Loading</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
