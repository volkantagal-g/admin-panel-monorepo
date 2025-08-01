// To be able to render a component once before all tests,
// use this import, otherwise dom is cleaned after first test
// You can also render component in each test as well without doing this
// NOTE: this cleanup import needs to be before react-testing-library import
import '@testing-library/react/dont-cleanup-after-each';
