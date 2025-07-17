export const getStoreAuditDetailRequestParams = filters => {
  const {
    _id,
    auditor,
    status,
    questionGroups,
    isSendToFranchise,
    round,
    auditDate,
    isPowerUser,
  } = filters;

  const params = {
    _id,
    auditor,
    status,
    questionGroups,
    isSendToFranchise,
    ...(isPowerUser && { round, auditDate }),
  };

  return params;
};
