import { Controller, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import { Switch } from 'react-native-elements';
import { SetupSwitchProps } from '../../../lib/types';
import WantsItem from '../../components/WantsItem';

export default function SetupSwitch<T extends FieldValues>({
  control,
  field,
  description,
  icon,
  type = 'ionicon',
  descriptionClassName,
}: SetupSwitchProps<T>) {
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
      <WantsItem type={type} icon={icon} description={description} descriptionClassName={descriptionClassName} />
    </View>
  );
}
