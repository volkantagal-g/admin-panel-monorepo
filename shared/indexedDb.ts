import Dexie from 'dexie';

export type CacheRecord = {
  name: string;
  cachedAt: Date;
}
export type PageRecord = {
  _id: string;
  name: {
    tr: string;
    en: string;
  };
  permKey: string;
  createdAt: Date;
  updatedAt: Date;
}
export type TableName = 'cache' | 'pages';
export type Tables = {
  cache: Dexie.Table<CacheRecord>;
  pages: Dexie.Table<PageRecord>;
};
export const indexedDb = new Dexie('admin-panel') as Dexie & Tables;

// version number needs to be updated for _every_ schema change
indexedDb.version(1)
  /**
   * .stores() accepts a schema which defines the _indexed_ columns for each table
   *
   * the first path always refers to the primary key
   * modifiers:
   *  - `++`: auto-incremented primary key
   *  - `&`: unique index
   *  - `*`: multi-entry index (https://dexie.org/docs/MultiEntry-Index)
   *  - `[A+B]`: compound index (https://dexie.org/docs/Compound-Index)
   *
   * see: https://dexie.org/docs/Version/Version.stores()#description
   */
  .stores({
    cache: 'name, cachedAt',
    pages: '_id, name.tr, name.en, permKey, createdAt, updatedAt',
  });
