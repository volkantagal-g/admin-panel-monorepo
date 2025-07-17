import { screen, render } from '@testing-library/react';

import ProgressBar from '@shared/components/ProgressBar';

const MOCK_PROGRESSBAR_ITEMS = [
  {
    key: 'verifyDate',
    tooltipText: 'İşletme Onaylama',
    color: '#5D3EBD',
    percentage: '89.47',
    text: '1dk 8sn',
  },
  {
    key: 'prepareDate',
    percentage: '9.21',
    text: '7sn',
  },
  {
    key: 'deliverDate',
    tooltipText: 'Teslim Etme',
    color: '#90e0ef',
    percentage: 2,
    text: '1sn',
  },
];

describe('ProgressBar Component', () => {
  it('should render component without error', async () => {
    render(
      <ProgressBar progressBarItems={MOCK_PROGRESSBAR_ITEMS} />,
    );
    await screen.findByText('1dk 8sn');
    await screen.findByText('7sn');
    await screen.findByText('1sn');
  });
});
