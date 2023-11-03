import { Controller, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import { Icon, Image, Switch, Text } from 'react-native-elements';
import { FormSwitchProps } from '../../lib/types';

export default function FormSwitch<T extends FieldValues>({
  control,
  field,
  description,
  icon,
  type = 'ionicon',
}: FormSwitchProps<T>) {
  return (
    <View className="mx-6 mb-3 flex flex-row items-center w-fit">
      <View className="w-2/12">
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Switch
              trackColor={{ false: '#fff', true: '#0e52fc' }}
              thumbColor={value ? '#fff' : '#b2b0b2'}
              ios_backgroundColor="#fff"
              onValueChange={onChange}
              value={value}
              style={{ borderWidth: 2, borderColor: value ? '#0e52fc' : '#dfdddf' }}
            />
          )}
          name={field}
        />
      </View>
      <View className="w-1/12">
        <Icon type={type} name={icon} size={29} />
      </View>
      <View className="w-9/12 mb-2 mt-2">
        <Text className="font-bold ml-2 font-bebas-neue text-md flex flex-wrap">{description}</Text>
      </View>
    </View>
  );
}
