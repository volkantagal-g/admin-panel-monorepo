import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';

import Gallery from '.';

import { EditingStageValidImage } from '../../types';

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
    imageUrl: 'https://cdn.getir.com/product/5ced4828d349d10001e70500_tr_1639494036238.jpeg',
    key: '1',
    isLocal: false,
    isUploading: false,
    isMain: false,
    isSelected: false,
  },
  {
    imageUrl: 'https://cdn.getir.com/product/5ced4829d349d10001e70510_tr_1605472120279.jpeg',
    key: '2',
    isLocal: false,
    isUploading: false,
    isMain: true,
    isSelected: false,
  },
];

describe('Market Product / Detail / Gallery / Display Settings / Gallery', () => {
  afterEach(cleanup);

  it('should render component without error', async () => {
    await renderComponent({
      ui: (
        <Gallery
          countryLanguage="tr"
          images={mockedImages}
        />
      ),
    });
  });

  it('should correctly render main image on cover', async () => {
    await renderComponent({
      ui: (
        <Gallery
          countryLanguage="tr"
          images={mockedImages}
          mainImageOnCover
        />
      ),
    });

    const mainImage = screen.getByRole('img', { name: 'Main image for TR' });
    expect(mainImage).toHaveProperty('src', mockedImages[2].imageUrl);

    screen.getByText('3 / 3');
    screen.getByText('(Main Image)');
  });

  it('should correctly render initial image instead of main image on cover', async () => {
    await renderComponent({
      ui: (
        <Gallery
          countryLanguage="tr"
          images={mockedImages}
        />
      ),
    });

    const coverImage = screen.getByRole('img', { name: 'An image for TR' });
    expect(coverImage).toHaveProperty('src', mockedImages[0].imageUrl);
  });

  it('should correctly navigate images', async () => {
    await renderComponent({
      ui: (
        <Gallery
          countryLanguage="tr"
          images={mockedImages}
        />
      ),
    });

    const leftBtn = screen.getByLabelText('Prev');
    const rightBtn = screen.getByLabelText('Next');
    const coverImage = screen.getByRole('img', { name: 'An image for TR' });

    expect(leftBtn).toBeDisabled();
    expect(coverImage).toHaveProperty('src', mockedImages[0].imageUrl);
    userEvent.click(rightBtn);
    expect(coverImage).toHaveProperty('src', mockedImages[1].imageUrl);
    userEvent.click(rightBtn);
    expect(coverImage).toHaveProperty('src', mockedImages[2].imageUrl);
    expect(rightBtn).toBeDisabled();

    userEvent.click(leftBtn);
    expect(coverImage).toHaveProperty('src', mockedImages[1].imageUrl);
    userEvent.click(leftBtn);
    expect(coverImage).toHaveProperty('src', mockedImages[0].imageUrl);
    expect(leftBtn).toBeDisabled();
  });

  it('should have edit button if onEditClick callback provided and correctly call it if clicked', async () => {
    const handleEditSpy = jest.fn();

    await renderComponent({
      ui: (
        <Gallery
          countryLanguage="tr"
          images={mockedImages}
          onEditClick={handleEditSpy}
        />
      ),
    });

    const editBtn = screen.getByLabelText('Edit');
    userEvent.click(editBtn);
    expect(handleEditSpy).toHaveBeenCalled();
  });

  it('should not have edit button if onEditClick callback not provided', async () => {
    await renderComponent({
      ui: (
        <Gallery
          countryLanguage="tr"
          images={mockedImages}
        />
      ),
    });

    const editBtn = screen.queryByLabelText('Edit');
    expect(editBtn).not.toBeInTheDocument();
  });
});
