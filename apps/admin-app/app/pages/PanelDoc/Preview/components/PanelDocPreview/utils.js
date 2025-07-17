import { getLangKey } from '@shared/i18n';

export function getTitleOfDocFile(docFile) {
  if (docFile.langKeys.length === 1) {
    return docFile.title[docFile.langKeys[0]];
  }
  return docFile.title[getLangKey()];
}
