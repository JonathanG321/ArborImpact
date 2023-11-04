import { View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { cn } from '../../lib/utils';

interface Props {
  image?: ImagePicker.ImagePickerAsset | null;
  classNames?: string;
}

function Avatar({ image, classNames }: Props) {
  return (
    <>
      {!!image ? (
        <Image
          source={image}
          accessibilityLabel="Avatar"
          className={cn('rounded-md overflow-hidden max-w-full object-cover pt-0 w-48 h-48', classNames)}
        />
      ) : (
        <View
          className={cn(
            'rounded-md overflow-hidden max-w-full bg-[#333] border border-[#bcbcbc] w-48 h-48',
            classNames
          )}
        />
      )}
    </>
  );
}

export default Avatar;
