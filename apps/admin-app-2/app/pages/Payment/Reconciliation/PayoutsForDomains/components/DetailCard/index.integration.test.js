import renderComponent from '@test/publicUtils/renderComponent';
import DetailCard from '.';
import ErrorDetailTable from './components/ErrorDetailTable';
import ProgressCard from './components/ProgressCard';

import { mockedFoodReport } from '@shared/api/payoutsForDomains/index.mock.data';

describe('DetailCard component', () => {
  it('main component should render component correctly', async () => {
    await renderComponent({ ui: <DetailCard data={mockedFoodReport} /> });
  });
  it('ErrorDetailTable component should render component correctly', async () => {
    await renderComponent({ ui: <ErrorDetailTable errors={mockedFoodReport.Data[0].Errors.FailedRecordInDetails} isVisible /> });
  });
  it('ProgressCard component should render component correctly', async () => {
    await renderComponent({ ui: <ProgressCard progressData={mockedFoodReport.Data[0].InProgress} title="TEST" /> });
  });
});
