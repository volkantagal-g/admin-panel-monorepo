interface ICountry {
  _id: MongoIDType;
  flag: string;
  defaultLanguageCode: string;
  dialingCode: number;
  name: {
    en: string;
    tr: string;
  }
  center: {
    coordinates: [number, number];
    acc: number;
    type: string;
    time: string;
  }
  code: {
    alpha2: string;
    alpha3: string;
    numeric: number;
  }
  currency: {
    code: {
      alpha: string;
      numeric: number;
    }
    symbol: string;
    isSymbolFirst: boolean;
  }
  timezones: Array<{
    timezone: string;
  }>
  languages: {
    en: { name: string;}
    tr: { name: string;}
  }
  languageSortOrder: string[]
}

interface ICity {
  _id: MongoIDType;
  id?: MongoIDType;
  name: {
    en: string;
    tr: string;
  };
  timezone: string;
}
