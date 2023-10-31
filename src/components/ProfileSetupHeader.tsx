import { View } from 'react-native';
import { Text } from 'react-native-elements';

export default function ProfileSetupHeader({ title }: { title: string }) {
  return (
    <View className="py-1 flex items-center">
      <Text className="font-bold text-xl mb-2">{title}</Text>
    </View>
  );
}
