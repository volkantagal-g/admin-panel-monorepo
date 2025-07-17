import axios from '@shared/axios/common';

export const checkOtp = async ({ clientId, code }) => {
  const response = await axios({
    method: 'POST',
    url: '/clientAccess/otp/checkOtp',
    data: { clientId, code },
  });
  
  return response.data;
};

export const sendOtp = async ({ clientId }) => {
  const response = await axios({
    method: 'POST',
    url: '/clientAccess/otp/sendOtp',
    data: { clientId },
  });

  return response.data;
};

export const validateActiveChatToken = async ({ clientId, activeChatToken }) => {
  const response = await axios({
    method: 'POST',
    url: '/clientAccess/activeChat/validateActiveChatToken',
    data: { clientId, activeChatToken },
  });
  return response.data;
};
