import { mockedAuthTempToken } from './index.mock.data';

const loginMockOptions = {
  url: '/login',
  successData: true,
};

const authTempTokenMockOptions = {
  url: '/login/authTempToken',
  handler: req => {
    const { tempToken } = req.body;
    return { data: mockedAuthTempToken(tempToken) };
  },
};

export default [loginMockOptions, authTempTokenMockOptions];
