import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { Input } from 'react-native-elements';

type Props<T extends FieldValues> = {
  control: Control<T> | undefined;
  field: Path<T>;
  outerClassName?: string;
  inputClassName?: string;
  inputContainerStyle?: ViewStyle;
  placeholder?: string;
  rules?: Omit<RegisterOptions<T, Path<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined;
};

export default function FormInput<T extends FieldValues>({
  control,
  field,
  outerClassName = '',
  inputClassName = '',
  inputContainerStyle = undefined,
  placeholder = '',
  rules = { required: true, minLength: 2 },
}: Props<T>) {
  return (
    <View className={outerClassName}>
      <Controller
        control={control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            className={inputClassName}
            inputContainerStyle={inputContainerStyle}
            placeholder={placeholder}
            autoCorrect={false}
          />
        )}
        name={field}
      />
    </View>
  );
}
