import { useEffect, useMemo, useState } from 'react';
import { Col, Row, Modal, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import orderBy from 'lodash/orderBy';
import { PlusCircleTwoTone, StarTwoTone } from '@ant-design/icons';

import { Creators } from '../../redux/actions';
import { getRatingTagsSelector } from '../../redux/selectors';
import useStyles from './styles';
import {
  COUNTRY_CODES,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPES,
  COUNTRY_IDS,
  GETIR_10_DOMAIN_TYPE,
} from '@shared/shared/constants';
import Spinner from '@shared/components/Spinner';
import MarketOrderRatingTagsFormModal from '../RatingTagsForm';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import RatingTextForm from '../RatingTextForm';
import { TagPayload } from '@shared/api/marketOrderRatings';
import RatingTagsComponent from './components/RatingTags';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { Select, Space } from '@shared/components/GUI';

export type SelectedRating = {
  rating?: number | null;
  domainType?: string | null;
  priority: number | null;
};

export type DomainTypeOption = {
  key: string;
  value: string;
};

export type TreeNode = {
  [key: string]: {
    key: number;
    dropPosition: number;
    dropToGap: boolean;
  };
};

const ratingStars = [1, 2, 3, 4, 5];

const RatingsOptions = () => {
  const classes = useStyles();
  const [form] = Form.useForm();
  const selectedCountry = useSelector(getSelectedCountryV2);
  const [selectedRating, setSelectedRating] = useState<SelectedRating>({
    rating: null,
    domainType: null,
    priority: null,
  });
  const [selectedRatingTag, setSelectedRatingTag] = useState<
    Partial<TagPayload>
  >({});
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);
  const [modal, confirmationModalContext] = Modal.useModal();
  const [domainType, setDomainType] = useState('');
  const { t } = useTranslation('marketOrderRatingsPage');
  const dispatch = useDispatch();
  const data = useSelector(getRatingTagsSelector.getData) || [];
  const isPending = useSelector(getRatingTagsSelector.getIsPending);

  const countryCode = selectedCountry?.code?.alpha2;

  const domainTypeOptions: DomainTypeOption[] = useMemo(() => {
    let domainTypes = GETIR_MARKET_DOMAIN_TYPES.map((type: number) => ({
      key: type.toString(),
      value: t(`global:GETIR_MARKET_DOMAIN_TYPES:${type}`),
    }));
    if (countryCode !== COUNTRY_CODES[COUNTRY_IDS.TR]) {
      domainTypes = domainTypes.filter(
        domain => Number(domain.key) !== GETIR_VOYAGER_DOMAIN_TYPE,
      );
    }
    setDomainType(domainTypes?.[0]?.value);
    return domainTypes;
  }, [countryCode, t]);

  const getRatingTagStars = (rating = 0) => {
    return Array.from(Array(rating), (_, index) => index + 1).map(star => (
      <StarTwoTone key={star} twoToneColor="#faad14" />
    ));
  };
  const selectedDomainType = domainTypeOptions.find(
    domain => domain.value === domainType,
  );

  useEffect(() => {
    if (selectedDomainType) {
      dispatch(
        Creators.getRatingTagsRequest({ domainType: selectedDomainType?.key }),
      );
    }
  }, [selectedDomainType, dispatch]);

  const onDrop = (info: TreeNode, dataTree: TagPayload[]) => {
    const targetIndex: number = info.node.key;
    const fromIndex: number = info.dragNode.key;
    const element = dataTree[fromIndex];
    dataTree.splice(fromIndex, 1);
    dataTree.splice(targetIndex, 0, element);
    dispatch(
      Creators.multiUpdateRatingTagsRequest({
        tags: dataTree.map((tag: TagPayload, index: number) => ({
          ...tag,
          id: tag?._id,
          title: tag.name,
          priority: index + 1,
        })),
        rating: { ...selectedRating, domainType: selectedDomainType?.key },
      }),
    );
  };

  const onAddRatingTag = (rating: number, priority = rating) => {
    setSelectedRating({ rating, priority, domainType: selectedDomainType?.key });
    setIsTagModalVisible(true);
  };

  const onUpdateTag = (tag: TagPayload) => {
    setIsTagModalVisible(true);
    setSelectedRating(prev => ({ ...prev, domainType: selectedDomainType?.key }));
    setSelectedRatingTag(tag);
  };

  const onDeleteTag = (tag: TagPayload) => {
    const modalConfig = {
      content: <>{t('CONFIRM_DELETE')}</>,
      okText: t('button:YES'),
      cancelText: t('button:NO'),
      onOk: () => {
        dispatch(Creators.deleteRatingTagRequest({ id: tag?._id }));
      },
      centered: true,
    };
    modal.confirm(modalConfig);
  };

  const onSelectRating = (rating: number) => {
    setSelectedRating(prev => ({ ...prev, rating }));
  };

  const onCancel = () => {
    setIsTagModalVisible(false);
    setSelectedRatingTag({});
  };

  useEffect(() => {
    if (domainType) {
      form.setFieldsValue({ domainType });
    }
  }, [domainType, form]);

  return (
    <div className="h-100 p-2">
      {confirmationModalContext}
      <MarketOrderRatingTagsFormModal
        isVisible={isTagModalVisible}
        onCancel={onCancel}
        selectedRating={selectedRating}
        selectedRatingTag={selectedRatingTag}
      />
      <Space title={t('PAGE_TITLE')}>
        <Row>

          <Col xs={8}>
            <Select
              label={t('global:DOMAIN')}
              value={selectedDomainType}
              onChange={(value: string) => {
                setDomainType(value);
              }}
              allowClear
              optionsData={domainTypeOptions}
            />
          </Col>
        </Row>
      </Space>
      <Space>
        <Form layout="vertical" form={form} data-testid="rating-options-form">
          <Row gutter={[4, 4]}>
            <Col span={24}>
              {isPending ? (
                <Spinner />
              ) : (
                <Row gutter={[8, 8]}>
                  {ratingStars.map(star => {
                    const option =
                      data?.find(
                        ({ rating }: { rating: number }) => rating === star,
                      ) || {};
                    return (
                      <Col
                        key={star}
                        className={classes.ratingContainer}
                        onMouseMove={() => onSelectRating(star)}
                      >
                        <Space className={classes.ratingCard}>
                          <RatingTagsComponent
                            tags={orderBy(option?.tags, 'priority', 'asc')}
                            onUpdateTag={onUpdateTag}
                            onDeleteTag={onDeleteTag}
                            t={t}
                            onDrop={onDrop}
                            classes={classes}
                          />
                          <div className={classes.rating}>
                            <div className="text-center">
                              <PlusCircleTwoTone
                                onClick={() => {
                                  if (option?.tags?.length >= 15) {
                                    return dispatch(
                                      ToastCreators.error({ message: t('ERROR.MAX_TAG_NUMBER') }),
                                    );
                                  }
                                  return onAddRatingTag(
                                    star,
                                    option?.tags?.length,
                                  );
                                }}
                                className="mb-5 display-4"
                              />
                            </div>
                            <div className={classes.ratingStar}>
                              {getRatingTagStars(star)}
                            </div>
                            <RatingTextForm
                              option={option}
                              domainType={(selectedDomainType?.key ?? GETIR_10_DOMAIN_TYPE) as number}
                              priority={star}
                            />
                          </div>
                        </Space>
                      </Col>
                    );
                  })}
                </Row>
              )}
            </Col>
          </Row>
        </Form>
      </Space>
    </div>
  );
};

export default RatingsOptions;
