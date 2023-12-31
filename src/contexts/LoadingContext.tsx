import { createContext, PropsWithChildren, useState } from 'react';
import LoadingScreen from '../screens/LoadingScreen';

export const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}>({
  isLoading: true,
  setIsLoading: () => undefined,
});

export function LoadingContextProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <LoadingScreen />}
      {children}
    </LoadingContext.Provider>
  );
}
