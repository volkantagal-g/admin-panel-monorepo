import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { EditableCell } from './EditableCell';

describe('EditableCell component', () => {
  it('should render EditableCell component without error', async () => {
    await renderComponent({ ui: <EditableCell /> });
    const component = screen.getByTestId('editable-cell');
    expect(component).toBeInTheDocument();
  });
});
