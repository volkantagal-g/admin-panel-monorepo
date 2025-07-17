import axios from 'axios';

import { baseURL } from '../constants';
import commonInterceptor from './interceptor';

const instance = axios.create({ baseURL });

commonInterceptor(instance);

export default instance;
