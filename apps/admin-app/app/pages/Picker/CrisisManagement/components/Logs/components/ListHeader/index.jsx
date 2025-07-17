import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button, InputNumber } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { pickerCrisesLogsSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import useStyles from './styles';

const ListHeader = ({ disabled = false, handleExport }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState(undefined);
  const { t } = useTranslation('pickerDetailPage');

  const handleSearch = useCallback(() => {
    dispatch(
      Creators.changePickerCrisesLogsFilters({ cardNumbers: Number.isInteger(cardNumber) ? [cardNumber] : undefined }),
    );
  }, [cardNumber, dispatch]);

  const filters = useSelector(pickerCrisesLogsSelector.getFilters);

  useEffect(() => {
    if (filters) {
      setCardNumber(filters.cardNumbers?.[0] ?? undefined);
    }
  }, [filters]);

  return (
    <div className={classes.root}>
      <InputNumber
        min={0}
        value={cardNumber}
        disabled={disabled}
        onChange={setCardNumber}
        className={classes.cardNumber}
        placeholder={t('CRISIS_MGMT.ENTER_INCIDENT')}
      />
      <div className={classes.controls}>
        <Button disabled={disabled} onClick={handleSearch}>
          {t('global:BRING')}
        </Button>

        <Button
          disabled={disabled}
          onClick={handleExport}
          icon={<CloudDownloadOutlined />}
        >
          {t('global:EXPORT_EXCEL')}
        </Button>
      </div>
    </div>
  );
};

export default ListHeader;
