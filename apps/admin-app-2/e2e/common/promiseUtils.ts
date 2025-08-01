// NOTE: Use other waitFor* type of apis for waiting for an element to be visible, enabled, etc.
// this is for if there is no appropriate waitFor* api, if you can only wait for time, like mocking a slow api response
export function dummyWaitMS(ms = 500, success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(null);
      }
      else {
        reject();
      }
    }, ms);
  });
}
