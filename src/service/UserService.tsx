import api from '../middlewares/axios';

interface IUser {
  id: number;
  name: string;
  phone: number;
  balance: number;
  limit: number;
  cpf: string;
}

interface ITransaction {
  receiverId: number;
  value: number;
}

interface IExtract {
  id: number;
  senderId: number;
  receiverId: number;
  value: number;
  transactionDate: number;
}

class UserService {
  static getUsers(): Promise<IUser> {
    const url = '/users/';
    return api.get(url)
      .then((res): IUser => res.data)
      .catch((error: Error) => {
        throw error;
      });
  }

  static getUserBalance(userId: number): Promise<IUser> {
    const url = `/users/${userId}`;
    return api.get(url)
      .then((res): IUser => res.data)
      .catch((error: Error) => {
        throw error;
      });
  }

  static getUserTransactions(userId: number): Promise<IExtract> {
    const url = `/transactions/extract/${userId}`;
    return api.get(url)
      .then((res) => res.data)
      .catch((error: Error) => {
        throw error;
      });
  }

  static createNewTransaction(senderId: number, body: ITransaction): Promise<IExtract> {
    const url = '/transactions/';
    return api.post(url, {
      senderId, ...body,
    })
      .then((res): IExtract => res.data)
      .catch((error: Error) => {
        throw error;
      });
  }

  static createNewUser(body: IUser): Promise<IUser> {
    const url = '/users/';
    return api.post<IUser>(url, body)
      .then((res): IUser => res.data)
      .catch((error: Error) => {
        throw error;
      });
  }
}

export default UserService;
