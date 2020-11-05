// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserService from '../service/UserService';

const defaultUserId = 1;

const BalanceContainer = styled.div`
text-align: center;
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const ShowBalance = (): any => {
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState('');
  const [limit, setLimit] = useState(0);

  const getUserBalance = (): any => {
    UserService.getUserBalance(defaultUserId).then((response: any) => {
      setBalance(parseFloat(response.balance));
      setName(response.name);
    });
  };

  const initialLoad = (): any => {
    getUserBalance();
  };

  useEffect(initialLoad, []);

  return (
    <BalanceContainer>
      <h2>Bem vindo {name}!</h2>
      <h3>Seu saldo: R${balance}</h3>
    </BalanceContainer>
  );
};

export default ShowBalance;
