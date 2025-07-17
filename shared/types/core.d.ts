// Use this type for any that needs to be fixed later
type TODO_FIXME_ANY = any;

type MongoIDType = string;

type MinLangObjectType = {
  en: string;
  tr: string;
};

type DynamicObjectType = { [key: string]: any };

type AntDCustomPaginationObjectType = {
  currentPage: number;
  rowsPerPage: number;
}

type BaseTranslationObjectType = {
  tr: string;
  en: string;
};
