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

interface IUser {
  name: string;
  phone: string;
  cpf: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const NewTransaction = (props: ITransaction): JSX.Element => {
  const { onClick, textButton, options } = props;
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [CPF, setCPF] = useState('');

  const createUserJson = (): IUser => ({
    name,
    phone,
    cpf: CPF.trim(),
  });

  return (
    <BalanceContainer>
      <Select
        options={options}
      />
      <InputDiv>
        <p>Telefone:</p>
        <MaskedInput
          placeholder="Telefone"
          mask="11111111111"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </InputDiv>
      <InputDiv>
        <p>CPF:</p>
        <MaskedInput
          placeholder="CPF"
          mask="11111111111"
          value={CPF}
          onChange={(e) => setCPF(e.target.value.trim())}
        />
      </InputDiv>
      <Button variant="primary" onClick={() => onClick(createUserJson())}>
        {textButton}
      </Button>
    </BalanceContainer>
  );
};

export default NewTransaction;
