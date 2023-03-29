import { ReactNode, ReactElement } from 'react';

interface Props {
  children: ReactNode;
}

export const AppContext = ({ children }: Props): ReactElement => (
  <>{children}</>
);