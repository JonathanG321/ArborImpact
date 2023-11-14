import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

type Props = {
  text: string;
  icon?: string;
  onPress: () => void;
};

export default function AuthButton({ onPress, text, icon }: Props) {
  return (
    <View className="flex items-center">
      <TouchableOpacity
        className="flex flex-row rounded-3xl bg-[#ebe378] px-16 py-3 shadow active:shadow-none"
        onPress={onPress}
      >
        <View className="flex items-center">
          <Text className="text-2xl font-extrabold">{text}</Text>
          {!!icon && <Text className="text-2xl font-extrabold absolute right-[-30]">{icon}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
}
