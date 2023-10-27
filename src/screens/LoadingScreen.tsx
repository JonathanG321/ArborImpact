import { View } from 'react-native';
import { Text } from 'react-native-elements';

export default function LoadingScreen() {
  return (
    <View className="flex items-center justify-center h-full w-full">
      <Text className="text-3xl font-bold">Loading...</Text>
    </View>
  );
}
