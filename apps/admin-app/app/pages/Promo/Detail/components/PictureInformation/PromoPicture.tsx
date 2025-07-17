import { useDispatch, useSelector } from 'react-redux';

import { UploadFile } from 'antd/lib/upload/interface';

import { Spin } from 'antd';

import MultiLanguageImageUploader from '@shared/components/UI/MultiLanguage/ImageUploader';
import { PROMO_IMAGES } from '@app/pages/Promo/constantValues';

import { Creators } from '@app/pages/Promo/Detail/redux/actions';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { selectUploadPromoImage } from '@app/pages/Promo/Detail/redux/selectors';
import { usePromoPictureStyles } from '@app/pages/Promo/Detail/components/PictureInformation/styles';

type PropTypes = {
  title: string
  imagePath: string[]
  hasSizeRestriction?: boolean
  filteredLanguages?: string[]
  className?:string
}

export function PromoPicture({ title, imagePath, hasSizeRestriction, filteredLanguages, className }: PropTypes) {
  const dispatch = useDispatch();
  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const isPending = useSelector(selectUploadPromoImage.getIsPending);
  const styles = usePromoPictureStyles();

  const handleUpload = (loadedImage: string, file: UploadFile, incomingImagePath: [string, string], isAppliedToOtherLanguages: boolean) => {
    dispatch(Creators.uploadPromoImageRequest({
      loadedImage,
      imagePath: incomingImagePath,
      contentType: file?.type,
      isAppliedToOtherLanguages,
    }));
  };

  return (
    <Spin spinning={isPending} className={styles.wrapper}>
      <MultiLanguageImageUploader
        disabled={isPending}
        className={className}
        cardTitle={title}
        onImageUpload={handleUpload}
        imagePath={imagePath}
        data={promo}
        filteredLanguages={filteredLanguages}
        {...(hasSizeRestriction && {
          minHeight: PROMO_IMAGES.PIC_URL.DIMENSIONS.height,
          minWidth: PROMO_IMAGES.PIC_URL.DIMENSIONS.width,
        })}
      />
    </Spin>
  );
}
