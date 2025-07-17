import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { Creators } from '../../redux/actions';
import {
  getMarketProductMasterCategorySelector,
  getChildrenOfMarketProductMasterCategorySelector,
  updateMarketProductMasterCategorySelector,
} from '../../redux/selectors';
import { tableColumns } from './config';
import AntTable from '@shared/components/UI/AntTable';
import { getLimitAndOffset } from '@shared/utils/common';
import { PRODUCT_MASTER_CATEGORY_LEVEL } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { usePrevious } from '@shared/hooks';

const langKey = getLangKey();

const ChildrenOfMasterCategoryTable = () => {
  const dispatch = useDispatch();
  const { id: masterCategoryId } = useParams();
  const masterCategory = useSelector(getMarketProductMasterCategorySelector.getData);
  const childrenOfMasterCategory = useSelector(getChildrenOfMarketProductMasterCategorySelector.getData);
  const isPending = useSelector(getChildrenOfMarketProductMasterCategorySelector.getIsPending);
  const isUpdatePending = useSelector(updateMarketProductMasterCategorySelector.getIsPending);
  const prevIsUpdatePending = usePrevious(isUpdatePending);
  const { t } = useTranslation('marketProductMasterCategoryPage');
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const getChildrenTableTitle = masterCategory => {
    const masterCategoryName = _.get(masterCategory, ['name', langKey], '');
    let title = '';
    if (masterCategory.level === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_MAIN_CATEGORY) {
      title = t('MASTER_CATEGORIES');
    }
    else if (masterCategory.level === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CATEGORY) {
      title = t('MASTER_CLASSES');
    }
    else if (masterCategory.level === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CLASS) {
      title = t('MASTER_SUB_CLASSES');
    }
    title = `${title} (${t('SUB_CATEGORIES_OF_MASTER_CATEGORY', { masterCategoryName })})`;
    return title;
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    if (prevIsUpdatePending
      && !isUpdatePending
      && masterCategory.level
      && (PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_SUB_CLASS !== masterCategory.level)
    ) {
      dispatch(Creators.getChildrenOfMarketProductMasterCategoryRequest({ id: masterCategoryId, ...getLimitAndOffset(pagination) }));
    }
  }, [isUpdatePending]);

  useEffect(() => {
    if (masterCategory.level && PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_SUB_CLASS !== masterCategory.level) {
      dispatch(Creators.getChildrenOfMarketProductMasterCategoryRequest({ id: masterCategory._id, ...getLimitAndOffset(pagination) }));
    }
  }, [pagination.currentPage, pagination.rowsPerPage, masterCategory._id]);

  return (
    <>
      {!(masterCategory.level === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_SUB_CLASS) && (
        <AntTable
          title={getChildrenTableTitle(masterCategory)}
          data={childrenOfMasterCategory}
          columns={tableColumns}
          loading={isPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
        />
      )}
    </>
  );
};

export default ChildrenOfMasterCategoryTable;
