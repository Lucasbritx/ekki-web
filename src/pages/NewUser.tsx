/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import styled from 'styled-components';
import MaskedInput from 'react-text-mask';
import { Button } from 'react-bootstrap';
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

interface ITransaction {
  textButton: string;
  onClick: any;
}

interface IUser {
  name: string;
  phone: string;
  cpf: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const NewUser = (props: ITransaction): JSX.Element => {
  const { onClick, textButton } = props;
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [CPF, setCPF] = useState('');
  const [validated, setValidated] = useState(false);

  const REQUIRED_FIELDS = 'Digite os campos obrigatórios!';
  const USER_CREATED = 'Usuário cadastrado';

  const replaceTelephone = (telephone: string): string => telephone
    .replace('(', '')
    .replace(')', '')
    .replace('-', '')
    .replace(' ', '')
    .replace('_', '');

  const replaceCPF = (cpf: string): string => cpf
    .replace('.', '')
    .replace('.', '')
    .replace('.', '')
    .replace('-', '');

  const createUserJson = (): IUser => ({
    name,
    phone,
    cpf: CPF.trim(),
  });

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    if ((phone && phone.length === 11) && name && (CPF && CPF.length === 11)) {
      onClick(createUserJson());
      notifySuccess(USER_CREATED);
    } else {
      notifyError(REQUIRED_FIELDS);
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <EKKIForm noValidate validated={validated} onSubmit={handleSubmit}>
      <BalanceContainer>
        <InputDiv>
          <p>Nome: </p>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputDiv>
        <InputDiv>
          <p>Telefone:</p>
          <MaskedInput
            placeholder="(__)__________"
            mask={['(', /[0-9]/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            value={phone}
            onChange={(e) => setPhone(replaceTelephone(e.target.value))}
          />
        </InputDiv>
        <InputDiv>
          <p>CPF:</p>
          <MaskedInput
            placeholder="CPF"
            mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
            value={CPF}
            onChange={(e) => setCPF(replaceCPF(e.target.value))}
          />
        </InputDiv>
        <Button
          variant="primary"
          type="submit"
        >
          {textButton}
        </Button>
      </BalanceContainer>
    </EKKIForm>
  );
};

export default NewUser;
