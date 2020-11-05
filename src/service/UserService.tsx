import api from '../middlewares/axios';

class UserService {
  static getUsers(): any {
    const url = '/users/';
    return api.get(url)
      .then((res) => res.data)
      .catch((error: any) => {
        throw error;
      });
  }

  static getUserBalance(userId: number): any {
    const url = `/users/${userId}`;
    return api.get(url)
      .then((res) => res.data)
      .catch((error: any) => {
        throw error;
      });
  }

  static getUserTransactions(userId: number): any {
    const url = `/transactions/extract/${userId}`;
    return api.get(url)
      .then((res) => res.data)
      .catch((error: any) => {
        throw error;
      });
  }

  static newTransaction(senderId: number, receiverId: number, value:number): any {
    const url = '/transactions/';
    return api.post(url, {
      senderId,
      receiverId,
      value,
    })
      .then((res) => res.data)
      .catch((error: any) => {
        throw error;
      });
  }

  static createNewUser(body: JSON): Promise<void> {
    const url = '/users/';
    return api.post(url, body)
      .then((res) => res.data)
      .catch((error: any) => {
        throw error;
      });
  }
}

export default UserService;
