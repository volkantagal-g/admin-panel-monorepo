import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import { getAntTableBodies, getAntTableRowByRowKey } from '@test/publicUtils/assertions';

import ImageList from '.';

import { EditingStageValidImage } from '../../types';

const mockedImages: readonly EditingStageValidImage[] = [
  {
    imageUrl: 'https://cdn.getir.com/product/5ced4829d349d10001e70510_tr_1605472120279.jpeg',
    key: '0',
    isLocal: false,
    isUploading: false,
    isMain: true,
    isSelected: false,
  },
  {
    imageUrl: 'https://cdn.getir.com/product/5ced48284a8a2a000137da2a_tr_1617715427818.jpeg',
    key: '1',
    isLocal: false,
    isUploading: false,
    isMain: false,
    isSelected: false,
  },
  {
    imageUrl: 'https://cdn.getir.com/product/5ced4828d349d10001e70500_tr_1639494036238.jpeg',
    key: '2',
    isLocal: false,
    isUploading: false,
    isMain: false,
    isSelected: false,
  },
];

describe('Market Product / Detail / Gallery / Display Settings / Image List', () => {
  afterEach(cleanup);

  it('should render component without error', async () => {
    await renderComponent({
      ui: (<ImageList
        currentImages={mockedImages}
        onRetry={() => {}}
        onSelectionChange={() => {}}
        onImageMove={() => {}}
        onRemove={() => {}}
        onMainImageChange={() => {}}
      />),
    });
  });

  it('should render provided images correctly', async () => {
    await renderComponent({
      ui: (
        <ImageList
          currentImages={mockedImages}
          onRetry={() => {}}
          onMainImageChange={() => {}}
          onSelectionChange={() => {}}
          onImageMove={() => {}}
          onRemove={() => {}}
        />
      ),
    });

    const checkboxes = screen.queryAllByRole('checkbox');
    expect(checkboxes.length).toEqual(3);
    const [list] = getAntTableBodies();

    await Promise.all(mockedImages.map(async image => {
      const row = getAntTableRowByRowKey(list, { key: image.key });

      within(row).getByRole('button', { name: image.isMain ? 'Main Image' : 'Make Main' });
      expect(within(row).getByRole('img', { name: 'One of product images' })).toHaveProperty('src', image.imageUrl);
    }));
  });

  it('should call onMainImageChange correctly', async () => {
    const handleMainImageSpy = jest.fn();

    await renderComponent({
      ui: (
        <ImageList
          currentImages={mockedImages}
          onMainImageChange={handleMainImageSpy}
          onRetry={() => {}}
          onSelectionChange={() => {}}
          onImageMove={() => {}}
          onRemove={() => {}}
        />
      ),
    });

    const [list] = getAntTableBodies();
    const row = getAntTableRowByRowKey(list, { key: '1' });
    const makeMainBtn = within(row).getByRole('button', { name: 'Make Main' });
    userEvent.click(makeMainBtn);
    expect(handleMainImageSpy).toHaveBeenCalledWith('1');
  });

  it('should call onRetry and onRemove correctly for failed images', async () => {
    const retrySpy = jest.fn();
    const removeSpy = jest.fn();

    await renderComponent({
      ui: (
        <ImageList
          currentImages={[
            ...mockedImages,
            {
              imageUrl: mockedImages[0].imageUrl,
              extension: 'jpeg',
              key: '10',
              isLocal: true,
              isUploading: false,
              isFailed: true,
              isMain: false,
              isSelected: false,
            },
          ]}
          onRetry={retrySpy}
          onRemove={removeSpy}
          onMainImageChange={() => {}}
          onSelectionChange={() => {}}
          onImageMove={() => {}}
        />
      ),
    });

    const [list] = getAntTableBodies();
    const row = getAntTableRowByRowKey(list, { key: '10' });
    within(row).getByText('Failed');

    const retryBtn = within(row).getByText('Retry');
    const removeBtn = within(row).getByText('Remove');

    userEvent.click(retryBtn);
    expect(retrySpy).toHaveBeenCalledWith('10');
    userEvent.click(removeBtn);
    expect(removeSpy).toHaveBeenCalledWith('10');
  });
});
