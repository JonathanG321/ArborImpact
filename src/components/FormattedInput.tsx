import { TextInput } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { cn } from '../../lib/utils';

export type FormattedInputProps = {
  donation: number;
  setDonation: React.Dispatch<React.SetStateAction<number>>;
};

export default function FormattedInput({ donation, setDonation }: FormattedInputProps) {
  return (
    <CurrencyInput
      className={cn('border-b w-20 text-md pb-1 font-bold')}
      prefix="$"
      minValue={0}
      delimiter=","
      separator="."
      value={donation}
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
            if (newValue === 0) setDonation(0);
          }}
        />
      )}
      onChangeValue={(newValue) => {
        if (typeof newValue === 'number') {
          setDonation(newValue || 0);
        }
      }}
    />
  );
}
