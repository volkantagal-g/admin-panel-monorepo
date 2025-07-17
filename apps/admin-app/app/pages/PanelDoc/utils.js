export const getCleanFilesForUpdate = files => {
  if (!files) {
    return undefined;
  }

  return files.map(file => ({
    ...file,
    // remove client side fields
    data: undefined,
    url: undefined,
    contentType: undefined,
    fileName: undefined,
    // _id also removed, since array will be created from start in db
    _id: undefined,
  }));
};
