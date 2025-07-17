import axios from '@shared/axios/common';

export const getOrderInsightInquiry = ({ foodOrderId }) => axios.post('/foodInsight/getOrderInsightInquiry', { foodOrderId })
  .then(res => res.data);
