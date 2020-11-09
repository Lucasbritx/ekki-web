// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Form } from 'react-bootstrap';

interface IForm {
  children: JSX.Element;
  onSubmit: any;
  validated: boolean;
  noValidate: boolean;
}

const EKKIForm = ({
  children, onSubmit, validated, noValidate, ...props
}: IForm): JSX.Element => (
  <Form
    validated={validated}
    onSubmit={onSubmit}
    noValidate={noValidate}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    {children}
  </Form>
);

export default EKKIForm;
