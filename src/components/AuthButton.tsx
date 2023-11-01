import { Pressable, View } from 'react-native';
import { Text } from 'react-native-elements';

type Props = {
  text: string;
  onClick: () => void;
};

export default function AuthButton({ onClick, text }: Props) {
  return (
    <View className="mt-5 py-1 self-stretch">
      <Pressable className="flex items-center rounded bg-blue-500 active:bg-blue-600 px-2 py-1" onPress={onClick}>
        <Text className="text-white text-lg">{text}</Text>
      </Pressable>
    </View>
  );
}
