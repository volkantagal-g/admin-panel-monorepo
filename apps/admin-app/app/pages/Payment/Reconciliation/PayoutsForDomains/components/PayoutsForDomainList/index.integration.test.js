import renderComponent from '@test/publicUtils/renderComponent';
import PayoutsForDomainList from '.';

describe('PayoutsForDomainList component', () => {
  it('main component should render component correctly', async () => {
    await renderComponent({ ui: <PayoutsForDomainList /> });
  });
});
