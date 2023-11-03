import { View, Alert, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface Props {
  image: ImagePicker.ImagePickerAsset | null;
  onSelect: (file: ImagePicker.ImagePickerAsset) => void;
}

export default function Avatar({ image, onSelect }: Props) {
  async function selectAvatar() {
    try {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (canceled || !assets.length) {
        return;
      }

      const file = assets[0];

      onSelect(file);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    }
  }

  return (
    <View className="flex flex-row justify-around items-center mb-3 m-3">
      <View>
        <Button title="Choose File" onPress={selectAvatar} />
      </View>
      {!!image ? (
        <Image
          source={image}
          accessibilityLabel="Avatar"
          className={'rounded-md overflow-hidden max-w-full object-cover pt-0 w-48 h-48'}
        />
      ) : (
        <View className={'rounded-md overflow-hidden max-w-full bg-[#333] border border-[#bcbcbc] w-48 h-48'} />
      )}
    </View>
  );
}
