import { REDUX_KEY } from '@shared/shared/constants';
import { CHANGE_LOG_TYPE_ENUM } from '../../constants';

const reducerKey = REDUX_KEY.THIRD_PARTY_COMPANY.DETAIL;

export const getThirdPartyCompanyByIdSelector = {
  getData: state => state[reducerKey]?.getThirdPartyCompanyById?.data,
  getIsPending: state => state[reducerKey]?.getThirdPartyCompanyById?.isPending,
  getCompanyId: state => state[reducerKey]?.getThirdPartyCompanyById?.data?._id,
};

export const getCredentialsByCompanyIdSelector = {
  getData: state => state[reducerKey]?.getCredentialsByCompanyId?.data,
  getIsPending: state => state[reducerKey]?.getCredentialsByCompanyId?.isPending,
};

export const thirdPartyCompanyAllowedRoutesSelector = {
  getData: state => state[reducerKey]?.allowedRoutes?.data,
  getIsPending: state => state[reducerKey]?.allowedRoutes?.isPending,
};

export const updateThirdPartyCompanyByIdSelector = {
  getData: state => state[reducerKey]?.updateThirdPartyCompanyById?.data,
  getIsPending: state => state[reducerKey]?.updateThirdPartyCompanyById?.isPending,
};

export const deleteThirdPartyCompanyByIdSelector = {
  getData: state => state[reducerKey]?.deleteThirdPartyCompanyById?.data,
  getIsPending: state => state[reducerKey]?.deleteThirdPartyCompanyById?.isPending,
};

export const activateThirdPartyCompanyByIdSelector = {
  getData: state => state[reducerKey]?.activateThirdPartyCompanyById?.data,
  getIsPending: state => state[reducerKey]?.activateThirdPartyCompanyById?.isPending,
};

export const deactivateThirdPartyCompanyByIdSelector = {
  getData: state => state[reducerKey]?.deactivateThirdPartyCompanyById?.data,
  getIsPending: state => state[reducerKey]?.deactivateThirdPartyCompanyById?.isPending,
};

export const createCredentialByCompanyIdSelector = {
  getData: state => state[reducerKey]?.createCredentialByCompanyId?.data,
  getIsPending: state => state[reducerKey]?.createCredentialByCompanyId?.isPending,
};

export const deleteCredentialByCompanyAndCredentialIdSelector = {
  getData: state => state[reducerKey]?.deleteCredentialByCompanyAndCredentialId?.data,
  getIsPending: state => state[reducerKey]?.deleteCredentialByCompanyAndCredentialId?.isPending,
};

export const activateCredentialByCompanyAndCredentialIdSelector = {
  getData: state => state[reducerKey]?.activateCredentialByCompanyAndCredentialId?.data,
  getIsPending: state => state[reducerKey]?.activateCredentialByCompanyAndCredentialId?.isPending,
};

export const deactivateCredentialByCompanyAndCredentialIdSelector = {
  getData: state => state[reducerKey]?.deactivateCredentialByCompanyAndCredentialId?.data,
  getIsPending: state => state[reducerKey]?.deactivateCredentialByCompanyAndCredentialId?.isPending,
};

export const generateCredentialSignatureByCredentialIdSelector = {
  getData: state => state[reducerKey]?.generateCredentialSignatureByCredentialId?.data,
  getIsPending: state => state[reducerKey]?.generateCredentialSignatureByCredentialId?.isPending,
};

export const companyChangeLogsSelector = {
  getData: state => state[reducerKey]?.getCompanyChangeLogs?.data,
  getIsPending: state => state[reducerKey]?.getCompanyChangeLogs?.isPending,
};

export const companyCredentialsChangeLogsSelector = {
  getData: state => state[reducerKey]?.getCompanyCredentialsChangeLogs?.data,
  getIsPending: state => state[reducerKey]?.getCompanyCredentialsChangeLogs?.isPending,
};

export const changeLogTableUISelector = {
  getCurrentChangeLogType: state => state[reducerKey]?.changeLogTableUI?.currentChangeLogType,
  getCurrentPagination: state => {
    const currentChangeLogType = state[reducerKey]?.changeLogTableUI?.currentChangeLogType;
    return state[reducerKey]?.changeLogTableUI?.[currentChangeLogType].pagination;
  },
  getCredentialChangeLogPagination: state => state[reducerKey]?.changeLogTableUI?.[CHANGE_LOG_TYPE_ENUM.CREDENTIAL]?.pagination,
  getCurrentSelectedCredentialKey: state => state[reducerKey]?.changeLogTableUI?.[CHANGE_LOG_TYPE_ENUM.CREDENTIAL]?.credentialKey,
  getCompanyGeneralChangeLogPagination: state => state[reducerKey]?.changeLogTableUI?.[CHANGE_LOG_TYPE_ENUM.COMPANY]?.pagination,
};
