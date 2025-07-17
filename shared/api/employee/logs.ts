import axios from '@shared/axios/common';

interface IEmployeeLogs {
  filters?: any;
}
export const filterEmployeeLogs = async ({ filters }: IEmployeeLogs) => {
  const { data } = await axios.post(
    '/employeeChangeLogs/logs/getFilteredEmployeeLogs',
    { ...filters },
  );

  return data;
};
