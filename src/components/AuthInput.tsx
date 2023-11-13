import { useTailwind } from 'nativewind';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import { TextStyle, View } from 'react-native';
import { Input } from 'react-native-elements';
import { cn } from '../../lib/utils';
import { ViewStyle } from 'react-native';

type Props<T extends FieldValues> = {
  error?: FieldError;
  control: Control<T, any>;
  field: Path<T>;
  placeholder?: string;
  label: string;
};

export default function AuthInput<T extends FieldValues>({ control, error, field, placeholder, label }: Props<T>) {
  return (
    <Controller
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <Input
          label={label}
          className={cn('border pl-3', { 'border-red-600': !!error })}
          labelStyle={useTailwind({ className: 'font-normal text-black text-xl mb-2' }) as TextStyle}
          containerStyle={useTailwind({ className: 'py-0' }) as ViewStyle}
          onChangeText={onChange}
          value={value}
          secureTextEntry={true}
          placeholder={placeholder || field}
          autoCapitalize={'none'}
          errorMessage={error?.message}
        />
      )}
      name={field}
    />
  );
}
