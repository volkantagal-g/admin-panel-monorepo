import _ from 'lodash';

import { ROUTE } from '@app/routes';

export const redirectHelper = ({ route, urlParams }) => {
  let redirectUrl = "";
  const { key, path } = _.get(ROUTE, route, {});
  const isUrlExisted = !_.isEmpty(key) && !_.isEmpty(path);
  const paramsInPath = isUrlExisted && path.split('/')
    .filter(urlPart => !_.isEmpty(urlPart) && urlPart.startsWith(':'))
    .map(param => param.replace(':', ''))
    .sort();

  const isUrlParamsReceived = !_.isEmpty(urlParams) && !_.isEmpty(paramsInPath);
  const isUrlParamsMatched = (isUrlParamsReceived && _.isEqual(paramsInPath, Object.keys(urlParams).sort()));
  const isValidToRedirect = isUrlExisted && isUrlParamsReceived && isUrlParamsMatched;
  
  if(isValidToRedirect){
    paramsInPath.forEach(param => {
      const paramToReplace = `:${param}`;
      redirectUrl = path.replace(paramToReplace, urlParams[param]);
    });
  }
  return { isValidToRedirect, redirectUrl };
};