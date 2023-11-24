import { useTailwind } from 'nativewind';
import { FieldError } from 'react-hook-form';
import { TextStyle, ViewStyle } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { cn } from '../../lib/utils';

type Props = {
  error?: FieldError;
  field: string;
  placeholder?: string;
  label?: string;
  secure?: boolean;
  onChange: (text: string) => void;
  value: string;
  cancellable?: boolean;
};

export default function BaseInput({
  error,
  field,
  placeholder,
  label,
  secure = false,
  onChange,
  value,
  cancellable = false,
}: Props) {
  return (
    <Input
      label={label}
      className={cn('border pl-3', { 'border-red-600': !!error })}
      labelStyle={useTailwind({ className: 'font-normal text-black text-xl mb-2' }) as TextStyle}
      inputContainerStyle={useTailwind({ className: 'py-0 border-0' }) as ViewStyle}
      onChangeText={onChange}
      value={value}
      secureTextEntry={secure}
      placeholder={placeholder || field}
      autoCapitalize={'none'}
      errorMessage={error?.message}
      rightIconContainerStyle={{ position: 'absolute', right: 1 }}
      rightIcon={
        value.length > 0 && cancellable ? (
          <Icon type="ionicon" name="close-outline" color="black" onPress={() => onChange('')} />
        ) : undefined
      }
    />
  );
}
