import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { Profile } from '../../lib/types';
import { useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { Image } from 'react-native-elements';
import { SDGs } from '../../lib/templates';

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

  const sdg = `SDG${index}` as keyof typeof SDGs;

  function onPress(sdgValues: string[], currentSDG: string, i: number) {
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
    <Pressable onPress={() => onPress(getValues().sdg, sdg, index)}>
      <View className={`m-1 border-8 ${pressed ? 'border-yellow-600' : 'border-gray-500'}`}>
        <Image source={SDGs[sdg]} style={{ width: 70, height: 70 }} PlaceholderContent={<ActivityIndicator />} />
      </View>
    </Pressable>
  );
}
