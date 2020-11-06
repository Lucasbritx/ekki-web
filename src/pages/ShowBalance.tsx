// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserService from '../service/UserService';

const defaultUserId = 1;

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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const ShowBalance = (): JSX.Element => {
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState('');
  const [limit, setLimit] = useState(0);

  const getUserBalance = (): any => {
    UserService.getUserBalance(defaultUserId).then((response: any) => {
      setBalance(parseFloat(response.balance));
      setLimit(parseFloat(response.limit));
      setName(response.name);
    });
  };

  const initialLoad = (): any => {
    getUserBalance();
  };

  useEffect(initialLoad, []);

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
