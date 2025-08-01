import '@test/publicUtils/configureWithoutCleanup';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { act, cleanup, fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { REDUX_KEY } from '@shared/shared/constants';
import renderComponent from '@test/publicUtils/renderComponent';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { mockedPieceTypeProduct } from '@shared/api/marketProduct/index.mock.data';
import * as CountrySelection from '@shared/redux/selectors/countrySelection';
import { getAntTableBodies } from '@test/publicUtils/assertions';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';

import DisplaySettings from './index';
import * as imageUploaderUtils from '@shared/components/GUI/ImageUploader/utils';
import * as commonUtils from '@shared/utils/common';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { createMarketProductImageUrlMock, updateMarketProductImageMock } from '@shared/api/marketProduct/index.mock.handler';
import * as api from '@shared/api/marketProduct';
import * as apiPublic from '@shared/api/public';

const mockedSelectedCountry = {
  code: { alpha2: 'TR' },
  languageSortOrder: [
    'tr',
    'en',
  ],
};

const {
  marketProduct: {
    picURL: mockedMainImages,
    picURLs: mockedProductPicURLs,
    widePicURL: mockedWideImage,
  },
} = mockedPieceTypeProduct;

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;

const DisplaySettingsWithSaga: FC = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <DisplaySettings />
  );
};

describe('Market Product / Detail / DisplaySettings', () => {
  afterEach(cleanup);

  it('should render component without error', async () => {
    await renderComponent({ ui: <DisplaySettings /> });
  });

  it('should render gallery for current languages with correct main image covers', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');
    getSelectedCountryV2Spy.mockReturnValue(mockedSelectedCountry as ICountry);

    await renderComponent({ ui: <DisplaySettings /> });

    expect(screen.getByText('Product Image')).toBeInTheDocument();
    expect(screen.getByText('Wide Image')).toBeInTheDocument();

    expect(screen.getByAltText('Main image for TR')).toHaveProperty('src', mockedMainImages.tr);
    expect(screen.getByAltText('Main image for EN')).toHaveProperty('src', mockedMainImages.en);
    expect(screen.getByAltText('Wide image for TR')).toHaveProperty('src', mockedWideImage.tr);
    expect(screen.getByAltText('Wide image for EN')).toHaveProperty('src', mockedWideImage.en);
  });

  it('should show the modal for settings and list the images correctly', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');
    getSelectedCountryV2Spy.mockReturnValue(mockedSelectedCountry as ICountry);

    await renderComponent({ ui: <DisplaySettings /> });

    const [productGallery] = screen.queryAllByTestId('gallery-tr');
    const editBtn = within(productGallery).getByLabelText('Edit');
    userEvent.click(editBtn);

    await screen.findByText('Image Settings TR');
    const [list] = getAntTableBodies();
    // eslint-disable-next-line testing-library/no-node-access
    const [_, ...rows] = list.getElementsByTagName('tr');

    await Promise.all(rows.map(async (row, index) => {
      const image = within(row).getByAltText('One of product images');
      const imageUrl = mockedProductPicURLs.tr[index];

      expect(image).toHaveProperty('src', imageUrl);
    }));
  });

  it('should correctly change the main image and send request when saved', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');
    getSelectedCountryV2Spy.mockReturnValue(mockedSelectedCountry as ICountry);
    const updateMarketProductSpy = jest.spyOn(api, 'updateMarketProduct');

    const [newMainImageUrl] = mockedProductPicURLs.tr;
    const mockedMarketProduct = mockedPieceTypeProduct.marketProduct;

    mockApiPerTestCase({
      ...updateMarketProductImageMock,
      successData: { marketProduct: mockedMarketProduct },
    });

    await renderComponent({ ui: <DisplaySettingsWithSaga /> });

    const [productGallery] = screen.queryAllByTestId('gallery-tr');
    const editBtn = within(productGallery).getByLabelText('Edit');
    userEvent.click(editBtn);

    await screen.findByText('Image Settings TR');

    const [mainBtn] = screen.queryAllByRole('button', { name: 'Make Main' });

    userEvent.click(mainBtn);

    await waitFor(() => {
      expect(mainBtn).toHaveTextContent('Main Image');
    });

    const saveBtn = screen.getByText('Save');
    userEvent.click(saveBtn);

    const expectedPayload = {
      id: mockedMarketProduct._id,
      body: {
        picURL: { tr: newMainImageUrl },
        picURLs: { tr: mockedProductPicURLs.tr },
      },
    };

    expect(updateMarketProductSpy).toHaveBeenCalledWith(expectedPayload);
  });

  it('should allow adding new images and add it to the end of the list', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');
    getSelectedCountryV2Spy.mockReturnValue(mockedSelectedCountry as ICountry);
    const updateMarketProductSpy = jest.spyOn(api, 'updateMarketProduct');
    const uploadToS3SignedUrlSpy = jest.spyOn(apiPublic, 'uploadToS3SignedUrl').mockImplementation(jest.fn());

    jest.spyOn(imageUploaderUtils, 'validateImage').mockImplementation(() => {
      return [];
    });

    jest.spyOn(imageUploaderUtils, 'getImageDimensions').mockImplementation(async () => {
      return { width: 100, height: 100 };
    });

    jest.spyOn(commonUtils, 'getBase64').mockImplementation((_, cb) => {
      cb('MOCK_BASE64');
    });

    mockApiPerTestCase(createMarketProductImageUrlMock);

    await renderComponent({ ui: <DisplaySettingsWithSaga /> });

    const [productGallery] = screen.queryAllByTestId('gallery-tr');
    const editBtn = within(productGallery).getByLabelText('Edit');
    userEvent.click(editBtn);
    await screen.findByText('Image Settings TR');
    const addImageBtn = screen.getByText('Add Image');
    userEvent.click(addImageBtn);
    const fileInput = await screen.findByTestId('image-uploader');

    const fileMock = new File(['mock'], 'square.webp', { type: 'image/webp' });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(fileInput, {
        target: {
          files: [
            fileMock,
          ],
        },
      });
    });

    await screen.findByText('square.webp');

    const uploadBtn = await screen.findByText('UPLOAD');
    userEvent.click(uploadBtn);

    await waitFor(() => {
      expect(uploadToS3SignedUrlSpy).toHaveBeenCalledWith({
        data: 'MOCK_BASE64',
        signedUrl: createMarketProductImageUrlMock.successData.signedUrl,
      });
    });

    const saveBtn = await screen.findByText('Save');
    await waitFor(() => {
      expect(saveBtn).toBeEnabled();
    });
    userEvent.click(saveBtn);

    expect(updateMarketProductSpy).toHaveBeenCalledWith({
      body: {
        picURL: { tr: mockedMainImages.tr },
        picURLs: {
          // ...mockedProductPicURLs,
          tr: [
            ...mockedProductPicURLs.tr,
            createMarketProductImageUrlMock.successData.cdnUrl,
          ],
        },
      },
      id: mockedPieceTypeProduct.marketProduct._id,
    });
  });

  it('should handle network errors gracefully when uploading images and let user remove the failed items and save again', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedPieceTypeProduct.marketProduct);
    const getSelectedCountryV2Spy = jest.spyOn(CountrySelection, 'getSelectedCountryV2');
    getSelectedCountryV2Spy.mockReturnValue(mockedSelectedCountry as ICountry);
    const updateMarketProductSpy = jest.spyOn(api, 'updateMarketProduct');
    const uploadToS3SignedUrlSpy = jest.spyOn(apiPublic, 'uploadToS3SignedUrl').mockImplementation(() => {
      throw new Error('Test Error');
    });

    jest.spyOn(imageUploaderUtils, 'validateImage').mockImplementation(() => {
      return [];
    });

    jest.spyOn(imageUploaderUtils, 'getImageDimensions').mockImplementation(async () => {
      return { width: 100, height: 100 };
    });

    jest.spyOn(commonUtils, 'getBase64').mockImplementation((_, cb) => {
      cb('MOCK_BASE64');
    });

    mockApiPerTestCase(createMarketProductImageUrlMock);

    await renderComponent({ ui: <DisplaySettingsWithSaga /> });

    const [productGallery] = screen.queryAllByTestId('gallery-tr');
    const editBtn = within(productGallery).getByLabelText('Edit');
    userEvent.click(editBtn);
    await screen.findByText('Image Settings TR');
    const addImageBtn = screen.getByText('Add Image');
    userEvent.click(addImageBtn);
    const fileInput = await screen.findByTestId('image-uploader');

    const fileMock = new File(['mock'], 'square.webp', { type: 'image/webp' });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(fileInput, {
        target: {
          files: [
            fileMock,
          ],
        },
      });
    });

    await screen.findByText('square.webp');

    const uploadBtn = await screen.findByText('UPLOAD');
    userEvent.click(uploadBtn);

    await waitFor(() => {
      expect(uploadToS3SignedUrlSpy).toHaveBeenCalledWith({
        data: 'MOCK_BASE64',
        signedUrl: createMarketProductImageUrlMock.successData.signedUrl,
      });
    });

    const removeBtn = await screen.findByText('Remove');
    userEvent.click(removeBtn);

    const saveBtn = await screen.findByText('Save');
    userEvent.click(saveBtn);

    expect(updateMarketProductSpy).toHaveBeenCalledWith({
      body: {
        picURL: { tr: mockedMainImages.tr },
        picURLs: { tr: mockedProductPicURLs.tr },
      },
      id: mockedPieceTypeProduct.marketProduct._id,
    });
  });
});
