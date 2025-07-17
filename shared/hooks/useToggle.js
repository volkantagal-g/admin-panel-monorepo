import { useReducer } from 'react';

export default (initialValue = false) => useReducer(state => !state, initialValue);
