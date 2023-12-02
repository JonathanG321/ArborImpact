import { TextInput } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { cn } from '../../lib/utils';

export type FormattedInputProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  classNames?: string;
};

export default function FormattedInput({ value, setValue, classNames }: FormattedInputProps) {
  return (
    <CurrencyInput
      className={cn('border-b w-20 text-md pb-1 font-bold', classNames)}
      prefix="$"
      minValue={0}
      delimiter=","
      separator="."
      value={value}
      renderTextInput={(textInputProps) => (
        <TextInput
          {...textInputProps}
          onChange={(e) => {
            const newValue = parseFloat(
              e.nativeEvent.text
                .split('')
                .filter((char) => /[0-9\.]/.test(char))
                .join('')
            );
            if (newValue === 0) setValue(0);
          }}
        />
      )}
      onChangeValue={(newValue) => {
        if (typeof newValue === 'number') {
          setValue(newValue || 0);
        }
      }}
    />
  );
}
