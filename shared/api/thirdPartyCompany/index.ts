import axios from '@shared/axios/common';
import { ChangeLogType } from '@app/pages/ThirdPartyCompany/types';

const THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS = Object.freeze({
  PATH: 'thirdPartyCompany',
  LIMIT: 10000,
  OFFSET: 0,
});

export const getThirdPartyCompanies = async () => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/getCompanies`,
    data: {
      limit: THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.LIMIT,
      offset: THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.OFFSET,
    },
  });
  return response.data;
};

export const getAllowedRoutes = async () => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/getAllowedRoutes`,
  });
  return response.data;
};

export const createThirdPartyCompany = async ({ body } : { body: DynamicObjectType }) => {
  const { name, description, allowedRoutes } = body;
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/createCompany`,
    data: {
      name,
      description,
      allowedRoutes,
    },
  });
  return response.data;
};

export const getThirdPartyCompanyById = async ({ id } : { id: MongoIDType }) => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/getCompanyById`,
    data: { id },
  });
  return response.data;
};

export const getCredentialsByCompanyId = async ({ id } : { id: MongoIDType }) => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/getCredentialsByCompanyId`,
    data: { id },
  });
  return response.data;
};

export const updateThirdPartyCompanyById = async ({ body } : { body: DynamicObjectType }) => {
  const { id, name, description, allowedRoutes } = body;
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/updateCompany`,
    data: {
      id,
      name,
      description,
      allowedRoutes,
    },
  });
  return response.data;
};

export const deleteThirdPartyCompanyById = async ({ id } : { id: MongoIDType }) => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/deleteCompany`,
    data: { id },
  });
  return response.data;
};

export const activateThirdPartyCompanyById = async ({ id } : { id: MongoIDType }) => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/activateCompany`,
    data: { id },
  });
  return response.data;
};

export const deactivateThirdPartyCompanyById = async ({ id } : { id: MongoIDType }) => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/deactivateCompany`,
    data: { id },
  });
  return response.data;
};

export const createCredentialByCompanyId = async ({ id, environment } : { id: MongoIDType, environment: String }) => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/createCredentialByCompanyId`,
    data: {
      id,
      environment,
    },
  });
  return response.data;
};

export const deleteCredentialByCompanyAndCredentialId = async ({ companyId, credentialId } : { companyId: MongoIDType, credentialId: String }) => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/deleteCredentialByCompanyAndCredentialId`,
    data: {
      companyId,
      credentialId,
    },
  });
  return response.data;
};

export const activateCredentialByCompanyAndCredentialId = async ({ companyId, credentialId } : { companyId: MongoIDType, credentialId: String }) => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/activateCredentialByCompanyAndCredentialId`,
    data: {
      companyId,
      credentialId,
    },
  });
  return response.data;
};

export const deactivateCredentialByCompanyAndCredentialId = async ({ companyId, credentialId } : { companyId: MongoIDType, credentialId: String }) => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/deactivateCredentialByCompanyAndCredentialId`,
    data: {
      companyId,
      credentialId,
    },
  });
  return response.data;
};

export const generateCredentialSignatureByCredentialId = async ({ credentialId } : {credentialId: String}) => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/generateCredentialSignatureByCredentialId`,
    data: { credentialId },
  });
  return response.data;
};

export type getThirdPartyCompanyChangeLogsResponseType = Promise<{
  changeLogs: [ChangeLogType];
}>;
export type getThirdPartyCompanyChangeLogsInputType = {
  key: String;
  limit?: Number;
  offset?: Number;
};
export const getThirdPartyCompanyChangeLogs = async (
  { key, limit, offset } : getThirdPartyCompanyChangeLogsInputType,
) : getThirdPartyCompanyChangeLogsResponseType => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/getChangeLogs`,
    data: { key, limit, offset },
  });
  return response.data;
};

export type getThirdPartyCompanyCredentialsChangeLogsResponseType = Promise<{
  changeLogs: [ChangeLogType];
}>;
export type getThirdPartyCompanyCredentialsChangeLogsInputType = {
  key: String;
  limit?: Number;
  offset?: Number;
};
export const getThirdPartyCompanyCredentialsChangeLogs = async (
  { key, limit, offset } : getThirdPartyCompanyCredentialsChangeLogsInputType,
) : getThirdPartyCompanyCredentialsChangeLogsResponseType => {
  const response = await axios({
    method: 'POST',
    url: `/${THIRD_PARTY_COMPANY_LIST_REQUEST_DEFAULTS.PATH}/getCredentialsChangeLogs`,
    data: { key, limit, offset },
  });
  return response.data;
};
