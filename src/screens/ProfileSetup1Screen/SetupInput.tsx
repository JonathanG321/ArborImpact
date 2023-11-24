import { useTailwind } from 'nativewind';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import InfoIcon from '../../components/InfoIcon';
import { cn } from '../../../lib/utils';

type Props<T extends FieldValues> = {
  control: Control<T> | undefined;
  field: Path<T>;
  outerClassName?: string;
  inputClassName?: string;
  inputContainerClassName?: string;
  iconClassName?: string;
  placeholder?: string;
  rules?: Omit<RegisterOptions<T, Path<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined;
  error?: string;
};

export default function FormInput<T extends FieldValues>({
  control,
  field,
  outerClassName = '',
  inputClassName = '',
  inputContainerClassName = '',
  iconClassName = '',
  placeholder = '',
  rules = { required: true, minLength: 2 },
  error,
}: Props<T>) {
  return (
    <View className={outerClassName}>
      <Controller
        control={control}
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            onChangeText={field.onChange}
            className={cn('px-3 border-b-2', inputClassName)}
            inputContainerStyle={
              useTailwind({ className: cn(inputContainerClassName, { 'text-[#d90000]': error }) }) as ViewStyle
            }
            placeholder={placeholder}
            autoCorrect={false}
            rightIconContainerStyle={
              useTailwind({ className: cn('absolute top-0 right-0', iconClassName) }) as ViewStyle
            }
            rightIcon={error ? <InfoIcon message={error} isError /> : undefined}
          />
        )}
        name={field}
      />
    </View>
  );
}
