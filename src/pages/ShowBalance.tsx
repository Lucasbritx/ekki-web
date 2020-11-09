// eslint-disable-next-line no-use-before-define
import React from 'react';
import styled from 'styled-components';

const BalanceContainer = styled.div`
  margin-bottom: 20px;
  p {
    margin-left: 10px;
    color: #c9c9c9;
    margin-bottom: 0px;
  }
`;

const NameUser = styled.h3`
  text-align: left;
  font-size: 20px;
`;

const BalanceUser = styled.h3`
  text-align: left;
  font-size: 18px;
  margin-left: 10px;
`;

interface IUser {
  name: string;
  balance: number;
  limit: number;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const ShowBalance = (props: IUser): JSX.Element => {
  const { balance, name, limit } = props;
  return (
    <BalanceContainer>
      <NameUser>Bem vindo {name}!</NameUser>
      <p>Saldo disponível</p>
      <BalanceUser>R${balance}</BalanceUser>
      <p>Limite disponível</p>
      <BalanceUser>R${limit}</BalanceUser>
    </BalanceContainer>
  );
};

export default ShowBalance;
