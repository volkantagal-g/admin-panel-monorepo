import { CacheRecord, TableName, indexedDb } from '../indexedDb';

/**
 * `api` refers the function used to make the request,
 *       it will be invoked with one parameter: the timestamp of the cache (may be null)
 *       it must return the full axios response, so that the status can be accessed
 * `collectionName` refers to the name of the schema in `app/db.js`
 *                  the table will be completely replaced with the response
 */
export const indexedDbCache = async (api: (date?: Date) => Promise<any>, collectionName: TableName) => {
  const previousCache = await indexedDb.cache.where({ name: collectionName }).first() as CacheRecord | null;
  const response = await api(previousCache?.cachedAt);
  if (response.status === 204) return; // cache is still valid

  await indexedDb.transaction('rw', [collectionName, 'cache'], async () => {
    // @ts-ignore can't know the collection type here, as it depends on the (runtime) collectionName
    await indexedDb[collectionName].bulkPut(response.data);
    await indexedDb.cache.put({ name: collectionName, cachedAt: new Date() });
  });
};
