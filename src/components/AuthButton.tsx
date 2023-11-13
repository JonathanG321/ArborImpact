import { Pressable, View } from 'react-native';
import { Text } from 'react-native-elements';

type Props = {
  text: string;
  icon?: string;
  onClick: () => void;
};

export default function AuthButton({ onClick, text, icon }: Props) {
  return (
    <View className="flex items-center">
      <Pressable
        className="flex flex-row rounded-3xl bg-[#ebe378] active:bg-[#ddd45d] px-16 py-3 shadow active:shadow-none"
        onPress={onClick}
      >
        <View className="flex items-center">
          <Text className="text-2xl font-extrabold">{text}</Text>
          {!!icon && <Text className="text-2xl font-extrabold absolute right-[-30]">{icon}</Text>}
        </View>
      </Pressable>
    </View>
  );
}
