export function addMissingAdminOptionFields(obj) {
  const { earlyFail = null, earlySuccess = null } = obj;

  return {
    ...obj,
    earlyFail,
    earlySuccess,
  };
}
