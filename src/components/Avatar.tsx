import { View, Image, StyleProp, ImageStyle } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { cn } from '../../lib/utils';

interface Props {
  image?: ImagePicker.ImagePickerAsset | null;
  classNames?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ImageStyle>;
}

function Avatar({ image, classNames, accessibilityLabel = 'Avatar', style }: Props) {
  return (
    <>
      {!!image ? (
        <Image
          source={image}
          accessibilityLabel={accessibilityLabel}
          style={style}
          className={cn('rounded-md overflow-hidden max-w-full object-cover pt-0 w-48 h-48', classNames)}
        />
      ) : (
        <View
          className={cn(
            'rounded-md overflow-hidden max-w-full bg-[#333] border border-[#bcbcbc] w-48 h-48',
            classNames
          )}
          style={style}
        />
      )}
    </>
  );
}

export default Avatar;
