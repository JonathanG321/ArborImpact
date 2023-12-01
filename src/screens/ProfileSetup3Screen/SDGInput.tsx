import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { Profile, SDG } from '../../../lib/types';
import { useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { Image } from 'react-native-elements';
import { SDGs } from '../../../lib/templates';
import { cn } from '../../../lib/utils';

type SDGInputProps = {
  index: number;
  setSDGValue: UseFormSetValue<Pick<Profile, 'sdg'>>;
  getValues: UseFormGetValues<Pick<Profile, 'sdg'>>;
};

export default function SDGInput({ index, setSDGValue, getValues }: SDGInputProps) {
  const [pressed, setPressed] = useState(false);
  if (index > 17 || index < 1) {
    return <Image source={{}} PlaceholderContent={<ActivityIndicator />} />;
  }

  const sdg = `SDG${index < 10 ? `0${index}` : index}` as keyof typeof SDGs;

  function onPress(sdgValues: SDG[], currentSDG: SDG) {
    if (!sdgValues.includes(currentSDG)) {
      sdgValues.push(currentSDG);
      setPressed(true);
    } else {
      sdgValues = sdgValues.filter((item) => item !== currentSDG);
      setPressed(false);
    }
    setSDGValue('sdg', sdgValues);
  }

  return (
    <Pressable onPress={() => onPress(getValues().sdg, sdg)}>
      <View className="p-1">
        <View className={cn('border-8 border-gray-500', { 'border-yellow-600': pressed })}>
          <Image source={SDGs[sdg]} className="w-16 h-16" PlaceholderContent={<ActivityIndicator />} />
        </View>
      </View>
    </Pressable>
  );
}
