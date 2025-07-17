import axios from '@shared/axios/common';

export const getKdsScoreMappingList = async ({ questionType }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/franchiseAudit/scoreMapping/getScoreMapping',
    data: { questionType },
  });
  return data;
};

export const updateScoreMappingGroup = async ({ data: body }) => {
  const { data } = await axios({
    method: 'POST',
    url: `/franchiseAudit/scoreMapping/updateScoreMapping`,
    data: body,
  });
  return data;
};
