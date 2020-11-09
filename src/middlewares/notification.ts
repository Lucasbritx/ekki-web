import { toast } from 'react-toastify';
import '../assets/styles/Notifications.scss';

const notifySuccess = (message: string): any => toast.success(message, { className: 'successNotification' });

const notifyError = (message: string): any => toast.error(message, { className: 'errorNotification' });

export { notifyError, notifySuccess };
