import { INTEGRATION_TYPES } from '@shared/shared/constants';

export const lowerCaseN11 = INTEGRATION_TYPES.N11.toLocaleLowerCase();

type Props = {
  canAccess: (key: string) => boolean;
  n11AccessKey: string;
  restOfGetirAccessKey: string;
  availableIntegrationTypes: string[];
}

export function getPermittedIntegrationTypes({
  canAccess,
  n11AccessKey,
  restOfGetirAccessKey,
  availableIntegrationTypes,
} : Props) : string[] {
  if (canAccess(n11AccessKey) && canAccess(restOfGetirAccessKey)) {
    return availableIntegrationTypes;
  }

  if (!canAccess(n11AccessKey) && canAccess(restOfGetirAccessKey)) {
    return availableIntegrationTypes.filter(integrationType => integrationType !== lowerCaseN11);
  }

  if (canAccess(n11AccessKey) && !canAccess(restOfGetirAccessKey)) {
    return availableIntegrationTypes.filter(integrationType => integrationType === lowerCaseN11);
  }

  return [];
}
