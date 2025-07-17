import { cleanup, render, screen } from '@testing-library/react';

import TableEmpty from '@shared/shared/components/TableEmpty';

describe('TableEmpty util tests', () => {
  afterAll(cleanup);
  it('should render the component as expected', async () => {
    const caption = 'No report available yet.';
    const { container } = await render(
      <TableEmpty caption={caption}>
        <button type="button">Load Reports</button>
      </TableEmpty>,
    );

    expect(container).toHaveTextContent(caption);
    expect(screen.getByRole('button')).toHaveTextContent('Load Reports');
  });
});
