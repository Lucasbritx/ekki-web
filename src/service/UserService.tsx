import api from '../middlewares/axios';

interface IUser {
  id: number;
  name: string;
  phone: number;
  balance: number;
  limit: number;
  cpf: string;
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
      .then((res) => res.data)
      .catch((error: any) => {
        throw error;
      });
  }

  static getUserBalance(userId: number): Promise<IUser> {
    const url = `/users/${userId}`;
    return api.get(url)
      .then((res) => res.data)
      .catch((error: any) => {
        throw error;
      });
  }

  static getUserTransactions(userId: number): Promise<IExtract> {
    const url = `/transactions/extract/${userId}`;
    return api.get(url)
      .then((res) => res.data)
      .catch((error: any) => {
        throw error;
      });
  }

  static createNewTransaction(senderId: number, body: JSON): Promise<IExtract> {
    const url = '/transactions/';
    return api.post(url, {
      senderId, ...body,
    })
      .then((res) => res.data)
      .catch((error: any) => {
        throw error;
      });
  }

  static createNewUser(body: JSON): Promise<IUser> {
    const url = '/users/';
    return api.post<IUser>(url, body)
      .then((res) => res.data)
      .catch((error: any) => {
        throw error;
      });
  }
}

export default UserService;
