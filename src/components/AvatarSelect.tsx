import { View, Alert, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Avatar from './Avatar';

interface Props {
  image?: ImagePicker.ImagePickerAsset | null;
  onSelect: (file: ImagePicker.ImagePickerAsset) => void;
}

export default function AvatarSelect({ image, onSelect }: Props) {
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
      <Avatar image={image} />
    </View>
  );
}
