import { Controller, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import { Switch, Text } from 'react-native-elements';
import { FormSwitchProps } from '../../lib/types';

export default function FormSwitch<T extends FieldValues>({ control, field, description }: FormSwitchProps<T>) {
  return (
    <View className="mx-6 mb-3 flex flex-row items-center">
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
      <Text className="font-bold font-bebas-neue text-md mb-2 ml-3 mt-2">{description}</Text>
    </View>
  );
}
