/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import EKKIForm from '../components/Form';
import { notifyError, notifySuccess } from '../middlewares/notification';

const BalanceContainer = styled.div`
margin: 10px;
padding: 10px;
button{
  width: 100%;
  margin-top: 5px;
}
`;

const InputDiv = styled.div`
width: 100%;
margin-bottom: 6px;
p{
  margin-bottom: 0px;
};
input{
  width:100%;
  padding:5px;
};
`;

interface IUser {
  id: number;
  name: string;
  email: string;
  phone: number;
  balance: number;
  limit: number;
  cpf: string;
}

interface ITransaction {
  textButton: string;
  onClick: any;
  user: IUser;
  options: any;
}

interface ITransactionJSON {
  receiverId: string;
  value: number;
}

const InputSelect = styled.input`
display:none
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const NewTransaction = ({
  onClick, textButton, options, user,
}: ITransaction): JSX.Element => {
  const [value, setValue] = useState('');
  const [amount, setAmount] = useState('');
  const [validated, setValidated] = useState(false);

  const REQUIRED_FIELDS = 'Digite os campos obrigatórios!';
  const INSUFFICIENT_FUNDS = 'Saldo insuficiente';
  const USING_LIMIT = 'Utilizando limite da conta';

  const createTransactionJson = (): ITransactionJSON => ({
    receiverId: value,
    value: Number(amount),
  });

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    if (value && amount) {
      if (Number(amount) > (Number(user.balance) + Number(user.limit))) {
        notifyError(INSUFFICIENT_FUNDS);
        event.stopPropagation();
      } else if (Number(amount) > Number(user.balance)) {
        notifySuccess(USING_LIMIT);
      }
      onClick(createTransactionJson());
    } else {
      notifyError(REQUIRED_FIELDS);
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <EKKIForm noValidate validated={validated} onSubmit={handleSubmit}>
      <BalanceContainer>
        <p>Conta:</p>
        <InputSelect
          required
          value={value}
          type="text"
          onChange={(e) => { setValue(e.target.value); }}
        />
        <Select
          placeholder="Conta"
          options={options.map((u: IUser) => ({
            value: u.id,
            label: u.name,
          }))}
          onChange={(event: any) => {
            setValue(event.value);
          }}
        />
        <InputDiv>
          <p>Valor:</p>
          <input
            required
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </InputDiv>
        <Button type="submit" variant="primary">
          {textButton}
        </Button>
      </BalanceContainer>
    </EKKIForm>
  );
};

export default NewTransaction;
