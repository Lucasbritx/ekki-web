// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import ShowBalance from './ShowBalance';
import Modal from '../components/Modal';
import NewUser from './NewUser';
import UserService from '../service/UserService';
import NewTransaction from './NewTransaction';

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
const Home = (): JSX.Element => {
  const [extract, setExtract] = useState<IExtract[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [showModal, setShowModal] = useState(false);

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
    UserService.createNewUser(user);
    setShowModal(false);
  };

  const initialLoad = (): any => {
    getUsers();
    getUserTransactions();
  };

  useEffect(initialLoad, []);

  return (
    <>
      <ShowBalance />
      <Modal
        textButton={seeExtract}
        title={extractTitle}
      >
        <>
          {extract.map((e: IExtract) => (
            <ul key={e.id}>
              <li>{getUserName(e.senderId)}</li>
              <li>{getUserName(e.receiverId)}</li>
              <li>R${e.value}</li>
            </ul>
          ))}
        </>
      </Modal>
      <Modal
        show={showModal}
        textButton={addUser}
        title={addUser}
      >
        <NewUser
          onClick={(e: any) => createNewUser(e)}
          textButton={addUser}
        />
      </Modal>
      <Modal
        textButton={newTransaction}
        title={newTransaction}
      >
        <NewTransaction
          options={users.map((user) => ({
            label: user.name,
            value: user.id,
          }))}
          onClick={(e: any) => createNewUser(e)}
          textButton={newTransaction}
        />
      </Modal>
    </>
  );
};

export default Home;
