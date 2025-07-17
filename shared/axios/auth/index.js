import axios from 'axios';

import { baseURL } from '../constants';
import authInterceptor from './interceptor';

const instance = axios.create({ baseURL });

authInterceptor(instance);

export default instance;
