// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowBalance from './ShowBalance';
import Modal from '../components/Modal';
import NewUser from './NewUser';
import UserService from '../service/UserService';
import NewTransaction from './NewTransaction';
import { notifyError, notifySuccess } from '../middlewares/notification';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const extractTitle = 'Extrato de transferências';
const newTransaction = 'Nova transação';
const seeExtract = 'Ver extrato';
const addUser = 'Adicionar conta';
const SUCCESS_TRANSACTION = 'Transação efetuada com sucesso';
const FAILED_TRANSACTION = 'Não foi possível realizar a transação';
const FAILED_NEW_USER = 'Erro ao criar usuário';
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

interface ITransaction {
  senderId: number;
  receiverId: number;
  value: number;
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
  const [showExtractModal, setShowExtractModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState('');
  const [limit, setLimit] = useState(0);

  const getUserTransactions = (): void => {
    UserService.getUserTransactions(defaultUserId).then((response: any) => {
      setExtract(response);
    })
      .catch((error: Error) => {
        throw error;
      });
  };
  const getUsers = (): void => {
    UserService.getUsers().then((response: any) => {
      setUsers(response);
    })
      .catch((error: Error) => {
        throw error;
      });
  };

  const getUserName = (id: number): string => {
    const userArray: IUser[] = users.filter((user: IUser) => (user.id === id));
    return userArray ? userArray[0].name : '';
  };

  const getUserBalance = (): void => {
    UserService.getUserBalance(defaultUserId).then((response: any) => {
      setBalance(parseFloat(response.balance));
      setLimit(parseFloat(response.limit));
      setName(response.name);
    });
  };

  const initialLoad = (): void => {
    getUsers();
    getUserTransactions();
    getUserBalance();
  };

  const createNewTransaction = async (transaction: ITransaction): Promise<void> => {
    try {
      await UserService.createNewTransaction(defaultUserId, transaction);
      notifySuccess(SUCCESS_TRANSACTION);
      initialLoad();
    } catch {
      notifyError(FAILED_TRANSACTION);
    }
  };

  const createNewUser = async (e: IUser): Promise<void> => {
    try {
      await UserService.createNewUser(e);
      initialLoad();
    } catch (error) {
      notifyError(FAILED_NEW_USER);
    }
  };

  useEffect(initialLoad, []);

  return (
    <>
      <Container>
        <ToastContainer />
        <ContainerDataUser>
          <ShowBalance
            balance={balance}
            limit={limit}
            name={name}
          />
          <ContainerOptionsUser>
            <Modal
              showModal={showExtractModal}
              setShowModal={(e: boolean) => setShowExtractModal(e)}
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
                showModal={showNewUserModal}
                setShowModal={(e: boolean) => setShowNewUserModal(e)}
                textButton={addUser}
                title={addUser}
              >
                <NewUser
                  onClick={(e: IUser) => {
                    setShowNewUserModal(false);
                    users.push(e);
                    return createNewUser(e);
                  }}
                  textButton={addUser}
                />
              </Modal>
              <Modal
                showModal={showTransactionModal}
                setShowModal={(e: boolean) => setShowTransactionModal(e)}
                textButton={newTransaction}
                title={newTransaction}
              >
                <NewTransaction
                  user={users.filter((user) => user.id === 1)[0]}
                  options={users.filter((user) => user.id !== 1)}
                  onClick={(e: ITransaction) => {
                    setShowTransactionModal(false);
                    return createNewTransaction(e);
                  }}
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
