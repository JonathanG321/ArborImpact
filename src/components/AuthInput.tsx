import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import BaseInput from './BaseInput';

type Props<T extends FieldValues> = {
  error?: FieldError;
  control: Control<T, any>;
  field: Path<T>;
  placeholder?: string;
  label: string;
  secure?: boolean;
};

export default function AuthInput<T extends FieldValues>({
  control,
  error,
  field,
  placeholder,
  label,
  secure = false,
}: Props<T>) {
  return (
    <Controller
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <BaseInput
          field={field}
          label={label}
          value={value}
          onChange={onChange}
          error={error}
          placeholder={placeholder}
          secure={secure}
        />
      )}
      name={field}
    />
  );
}
