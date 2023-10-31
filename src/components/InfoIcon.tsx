import { Icon } from 'react-native-elements';
import { Popable } from 'react-native-popable';

export default function InfoIcon({ message, isError = false }: { message: string; isError?: boolean }) {
  return (
    <Popable content={message} backgroundColor={isError ? 'red' : undefined}>
      <Icon type="ionicon" name="information-circle-outline" color={isError ? 'red' : undefined} />
    </Popable>
  );
}
