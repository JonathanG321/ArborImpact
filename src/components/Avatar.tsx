import { supabase } from '../../supabase/supabase';
import { View, Alert, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface Props {
  size: number;
  image: ImagePicker.ImagePickerAsset | null;
  onSelect: (file: ImagePicker.ImagePickerAsset) => void;
}

export default function Avatar({ image, onSelect }: Props) {
  // useEffect(() => {
  //   if (url) downloadImage(url);
  // }, [url]);

  async function selectAvatar() {
    try {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
      });

      if (canceled || !assets.length) {
        console.warn('cancelled');
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
    <View className="flex flex-row justify-around items-center mb-3">
      <View>
        <Button title="Choose File" onPress={selectAvatar} />
      </View>
      {!!image ? (
        <Image
          source={image}
          accessibilityLabel="Avatar"
          className={'rounded-md overflow-hidden max-w-full object-cover pt-0 w-24 h-24'}
        />
      ) : (
        <View className={'rounded-md overflow-hidden max-w-full bg-[#333] border border-[#bcbcbc] w-24 h-24'} />
      )}
    </View>
  );
}
