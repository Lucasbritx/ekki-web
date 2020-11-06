// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 10px;
`;

const ContainerDataUser = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 45%;
    height: 40%;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
    transition: 0.25s;

    @media (max-width: 800px) {
      width: 90%;
      margin: 10px;
      transition: 0.25s;
    }

    button {
      margin-bottom: 5px;
      width: 100%;
    }
`;

const ContainerOtherOptionsUser = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    button {
      width: 100%;
    }

    button:first-child {
        margin-right: 5px;
    }
`;

const ContainerOptionsUser = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

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

  const getUserTransactions = (): void => {
    UserService.getUserTransactions(defaultUserId).then((response: any) => {
      setExtract(response);
    });
  };
  const getUsers = (): void => {
    UserService.getUsers().then((response: any) => {
      setUsers(response);
    });
  };

  const getUserName = (id: number): string => {
    const a: IUser[] = users.filter((user: IUser) => (user.id === id));
    return a ? a[0].name : '';
  };

  const createNewUser = (user: JSON): void => {
    UserService.createNewUser(user);
    setShowModal(false);
  };

  const initialLoad = (): void => {
    getUsers();
    getUserTransactions();
  };

  useEffect(initialLoad, []);

  return (
    <>
      <Container>
        <ContainerDataUser>
          <ShowBalance />
          <ContainerOptionsUser>
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
            <ContainerOtherOptionsUser>
              <Modal
                showModal={showModal}
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
                  onClick={(e: JSON) => createNewUser(e)}
                  textButton={newTransaction}
                />
              </Modal>
            </ContainerOtherOptionsUser>
          </ContainerOptionsUser>
        </ContainerDataUser>
      </Container>
    </>
  );
};

export default Home;