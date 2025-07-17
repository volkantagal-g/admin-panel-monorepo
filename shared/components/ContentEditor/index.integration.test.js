import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import ContentEditor from './index';

const onChange = jest.fn();
const onImageInsert = jest.fn();

describe('ContentEditor', () => {
  beforeEach(() => {
    onChange.mockReset();
    onImageInsert.mockReset();
  });

  it('should render without errors', async () => {
    await renderComponent({
      ui: (
        <ContentEditor text="" onChange={onChange} onImageInsert={onImageInsert} tooltips={{}} />
      ),
    });
    expect(screen.getByTestId('content-editor')).toBeInTheDocument();
  });
});
