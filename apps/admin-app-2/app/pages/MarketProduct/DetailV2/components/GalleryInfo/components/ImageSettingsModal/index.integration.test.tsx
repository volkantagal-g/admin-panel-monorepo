import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';

import ImageSettingsModal from '.';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';

import { EditingStageValidImage, MultiLanguageGalleryImages } from '../../types';
import { PRODUCT_IMAGE_VALID_RATIOS, SUPPORTED_IMAGE_FORMATS } from '@app/pages/MarketProduct/DetailV2/components/GalleryInfo/constants';
import { getAntTableBodies, getAntTableRowByRowKey } from '@test/publicUtils/assertions';
import { updateMarketProductImageMock } from '@shared/api/marketProduct/index.mock.handler';

const mockedImages: readonly EditingStageValidImage[] = [
  {
    imageUrl: 'https://cdn.getir.com/product/5ced48284a8a2a000137da2a_tr_1617715427818.jpeg',
    key: '0',
    isLocal: false,
    isUploading: false,
    isMain: false,
    isSelected: false,
  },
  {
    imageUrl: 'https://cdn.getir.com/product/5ced4829d349d10001e70510_tr_1605472120279.jpeg',
    key: '1',
    isLocal: false,
    isUploading: false,
    isMain: true,
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

const mockedMultiLanguageImages: MultiLanguageGalleryImages = {
  tr: mockedImages,
  en: mockedImages,
};

describe('Market Product / Detail / Gallery / Display Settings / Image Settings Modal', () => {
  afterEach(cleanup);

  it('should render component without error and show the first image as the cover image', async () => {
    await renderComponent({
      ui: (
        <ImageSettingsModal
          currentImages={mockedMultiLanguageImages}
          countryLanguage="tr"
          onSave={() => {}}
          onChange={() => {}}
          onCancel={() => {}}
          updateIsPending={false}
          validImageRatios={['1:1']}
          supportedFileTypes={SUPPORTED_IMAGE_FORMATS}
          maxImageSizeInMB={4}
        />
      ),
    });

    const galleryContainer = screen.getByTestId('gallery-tr');
    expect(within(galleryContainer).getByRole('img', { name: 'An image for TR' })).toHaveProperty('src', mockedImages[0].imageUrl);
  });

  it('should correctly render multiple images and render modal content correctly', async () => {
    await renderComponent({
      ui: (
        <ImageSettingsModal
          currentImages={mockedMultiLanguageImages}
          countryLanguage="tr"
          onSave={() => {}}
          onChange={() => {}}
          onCancel={() => {}}
          updateIsPending={false}
          validImageRatios={PRODUCT_IMAGE_VALID_RATIOS}
          supportedFileTypes={SUPPORTED_IMAGE_FORMATS}
          maxImageSizeInMB={4}
        />
      ),
    });

    const [list] = getAntTableBodies();
    const renderedImages = mockedMultiLanguageImages.tr;

    screen.getByText('Image Settings TR');
    screen.getByText('1 / 3');

    await Promise.all(renderedImages.map(async image => {
      const row = getAntTableRowByRowKey(list, { key: image.key });

      within(row).getByRole('button', { name: image.isMain ? 'Main Image' : 'Make Main' });
      expect(within(row).getByRole('img', { name: 'One of product images' })).toHaveProperty('src', image.imageUrl);
    }));
  });

  it('should correctly change the main image and return the new list with image image updated', async () => {
    const handleChangeSpy = jest.fn();

    await renderComponent({
      ui: (
        <ImageSettingsModal
          currentImages={mockedMultiLanguageImages}
          countryLanguage="tr"
          onSave={() => {}}
          onChange={handleChangeSpy}
          onCancel={() => {}}
          updateIsPending={false}
          validImageRatios={PRODUCT_IMAGE_VALID_RATIOS}
          supportedFileTypes={SUPPORTED_IMAGE_FORMATS}
          maxImageSizeInMB={4}
        />
      ),
    });

    const [list] = getAntTableBodies();
    const mainImageRow = getAntTableRowByRowKey(list, { key: '2' });

    const makeMainBtn = within(mainImageRow).getByText('Make Main');
    userEvent.click(makeMainBtn);

    expect(handleChangeSpy).toHaveBeenCalledWith([
      mockedImages[0],
      {
        ...mockedImages[1],
        isMain: false,
      },
      {
        ...mockedImages[2],
        isMain: true,
      },
    ]);
  });

  it('should disable save button if there is a local image in the list', async () => {
    const handleChangeSpy = jest.fn();

    await renderComponent({
      ui: (
        <ImageSettingsModal
          currentImages={{
            tr: [
              ...mockedImages,
              {
                key: '5',
                imageUrl: mockedImages[0].imageUrl,
                extension: 'jpeg',
                isMain: false,
                isLocal: true,
                isUploading: false,
                isFailed: false,
                isSelected: false,
              },
            ],
            en: mockedMultiLanguageImages.en,
          }}
          countryLanguage="tr"
          onSave={() => {}}
          onChange={handleChangeSpy}
          onCancel={() => {}}
          updateIsPending={false}
          validImageRatios={PRODUCT_IMAGE_VALID_RATIOS}
          supportedFileTypes={SUPPORTED_IMAGE_FORMATS}
          maxImageSizeInMB={4}
        />
      ),
    });

    const saveBtn = screen.getByRole('button', { name: 'Save' });

    expect(saveBtn).toBeDisabled();
  });

  it('should delete images from list correctly and enable save button if no local images are left after deletion', async () => {
    let mockedInvalidImages: MultiLanguageGalleryImages = {
      tr: [
        ...mockedImages,
        {
          key: '5',
          imageUrl: mockedImages[0].imageUrl,
          extension: 'jpeg',
          isMain: false,
          isLocal: true,
          isUploading: false,
          isFailed: false,
          isSelected: false,
        },
      ],
      en: mockedMultiLanguageImages.en,
    } as const;

    const handleChangeSpy = jest.fn(() => {
      mockedInvalidImages = mockedMultiLanguageImages;
    });

    const { rerender } = await renderComponent({
      ui: (
        <ImageSettingsModal
          currentImages={mockedInvalidImages}
          countryLanguage="tr"
          onSave={() => {}}
          onChange={handleChangeSpy}
          onCancel={() => {}}
          updateIsPending={false}
          validImageRatios={PRODUCT_IMAGE_VALID_RATIOS}
          supportedFileTypes={SUPPORTED_IMAGE_FORMATS}
          maxImageSizeInMB={4}
        />
      ),
    });

    const saveBtn = screen.getByRole('button', { name: 'Save' });
    const deleteBtn = screen.getByRole('button', { name: 'Delete Selected' });

    expect(saveBtn).toBeDisabled();
    expect(deleteBtn).toBeDisabled();

    const [list] = getAntTableBodies();
    const localImageRow = getAntTableRowByRowKey(list, { key: '5' });

    const checkbox = within(localImageRow).getByRole('checkbox');
    userEvent.click(checkbox);
    userEvent.click(deleteBtn);

    rerender(
      <ImageSettingsModal
        currentImages={mockedInvalidImages}
        countryLanguage="tr"
        onSave={() => {}}
        onChange={handleChangeSpy}
        onCancel={() => {}}
        updateIsPending={false}
        validImageRatios={PRODUCT_IMAGE_VALID_RATIOS}
        supportedFileTypes={SUPPORTED_IMAGE_FORMATS}
        maxImageSizeInMB={4}
      />,
    );

    await waitFor(() => {
      expect(saveBtn).toBeEnabled();
    });
  });

  it('should correctly change the main image and return the new list with image image updated', async () => {
    mockApiPerTestCase(updateMarketProductImageMock);
    const handleChangeSpy = jest.fn();

    await renderComponent({
      ui: (
        <ImageSettingsModal
          currentImages={mockedMultiLanguageImages}
          countryLanguage="tr"
          onSave={() => {}}
          onChange={handleChangeSpy}
          onCancel={() => {}}
          updateIsPending={false}
          validImageRatios={PRODUCT_IMAGE_VALID_RATIOS}
          supportedFileTypes={SUPPORTED_IMAGE_FORMATS}
          maxImageSizeInMB={4}
        />
      ),
    });

    const copyToOtherLanguagesRadio = await screen.findByText(/copy to other languages/i);
    userEvent.click(copyToOtherLanguagesRadio);
    const saveBtn = await screen.findByText(/save/i);
    userEvent.click(saveBtn);
  });
});
