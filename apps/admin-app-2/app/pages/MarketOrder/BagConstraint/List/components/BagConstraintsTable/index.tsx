import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';

import useStyles from './styles';
import AntTable from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';

import { getTableColumns } from './config';
import { bagConstraintsSelector, masterCategoriesSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';
import { formatBagConstraints } from '../utils';
import BagConstraintDetail from '../../../Detail/components/BagConstraintDetailForm';
import { BagConstraint } from '../../../types';

const BagConstraintsTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('bagConstraintsPage');
  const data = useSelector(bagConstraintsSelector.getData);
  const masterCategories = useSelector(masterCategoriesSelector.getData);
  const isPending = useSelector(bagConstraintsSelector.getIsPending);
  const { canAccess } = usePermission();
  const bagConstraints = useMemo(() => formatBagConstraints(masterCategories, data), [data, masterCategories]);
  const classes = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onToggleModal = () => {
    setIsModalVisible(prevState => !prevState);
  };

  const onSelectBagConstraint = (bagConstraint: BagConstraint) => {
    dispatch(Creators.setSelectedBagConstraint({ bagConstraint }));
    onToggleModal();
  };
  const columns = getTableColumns({ t, canAccess, onSelectBagConstraint });
  return (
    <>
      <BagConstraintDetail isModalVisible={isModalVisible} onCloseModal={onToggleModal} />
      <AntTable
        className={classes.antTable}
        data-testid="bag-constraints-table"
        title={t('TITLE')}
        columns={columns}
        data={bagConstraints}
        loading={isPending}
      />
    </>
  );
};

export default BagConstraintsTable;
