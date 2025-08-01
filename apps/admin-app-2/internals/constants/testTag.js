const TEST_TAG = {
  // use SMOKE tag for minimal must-work features, intended to be run on every PR
  SMOKE: '@smoke',
  // use REGRESSION tag for full regression tests, intended to be run on team specific release
  REGRESSION: '@regression',
};

module.exports = { TEST_TAG };
