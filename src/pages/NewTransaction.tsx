/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MaskedInput from 'react-maskedinput';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import UserService from '../service/UserService';

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

interface ITransaction {
  textButton: string;
  onClick: any;
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
const NewTransaction = (props: ITransaction): JSX.Element => {
  const { onClick, textButton, options } = props;
  const [value, setValue] = useState('');
  const [amount, setAmount] = useState('');

  const createUserJson = (): ITransactionJSON => ({
    receiverId: value,
    value: Number(amount),
  });

  return (
    <BalanceContainer>
      <p>Conta:</p>
      <InputSelect
        value={value}
        type="text"
        onChange={(e) => { setValue(e.target.value); }}
      />
      <Select
        placeholder="Conta"
        options={options.map((user: any) => ({
          value: user.id,
          label: user.name,
        }))}
        onChange={(event: any) => {
          setValue(event.value);
        }}
      />
      <InputDiv>
        <p>Valor:</p>
        <input
          max={Number(options.balance) + Number(options.limit)}
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </InputDiv>
      <Button variant="primary" onClick={() => onClick(createUserJson())}>
        {textButton}
      </Button>
    </BalanceContainer>
  );
};

export default NewTransaction;
