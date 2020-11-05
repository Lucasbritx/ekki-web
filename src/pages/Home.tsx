// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import ShowBalance from './showBalance';
import Modal from '../components/Modal';
import NewUser from './NewUser';
import UserService from '../service/UserService';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const extractTitle = 'Extrato de transferências';
const newTransaction = 'Nova transação';
const seeExtract = 'Ver extrato';
const addUser = 'Adicionar conta';
const defaultUserId = 1;

interface IExtract {
  id: number;
  senderId: number;
  receiverId: number;
  value: number;
  transactionDate: number;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  phone: number;
  balance: number;
  limit: number;
  cpf: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Home = (): any => {
  const [extract, setExtract] = useState([]);
  const [users, setUsers] = useState([]);

  const getUserTransactions = (): any => {
    UserService.getUserTransactions(defaultUserId).then((response: any) => {
      setExtract(response);
    });
  };
  const getUsers = (): any => {
    UserService.getUsers().then((response: any) => {
      setUsers(response);
    });
  };

  const getUserName = (id: number): string => {
    const a: IUser[] = users.filter((user: IUser) => (user.id === id));
    return a ? a[0].name : '';
  };

  const createNewUser = (user: JSON): any => {
    UserService.createNewUser(user).then((response: any) => {
      setExtract(response);
    });
  };

  const initialLoad = (): any => {
    getUsers();
    getUserTransactions();
  };

  useEffect(initialLoad, []);

  return (
    <div>
      <ShowBalance />
      <Modal
        textButton={seeExtract}
        title={extractTitle}
      >
        <div>
          {extract.map((e: IExtract) => (
            <ul key={e.id}>
              <li>{getUserName(e.senderId)}</li>
              <li>{getUserName(e.receiverId)}</li>
              <li>R${e.value}</li>
            </ul>
          ))}
        </div>
      </Modal>
      <Modal
        textButton={addUser}
        title={addUser}
      >
        <NewUser
          onClick={(e: any) => createNewUser(e)}
          textButton={addUser}
        />
      </Modal>
    </div>
  );
};

export default Home;
