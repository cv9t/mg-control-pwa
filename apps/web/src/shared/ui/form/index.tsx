import { FormEvent, ReactNode } from 'react';

import { Nullable } from '@mg-control/shared/types';

import { FormContent } from './content';

type FormProps = {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function Form({ children, onSubmit }: FormProps): Nullable<JSX.Element> {
  return <form onSubmit={onSubmit}>{children}</form>;
}

Form.Content = FormContent;
