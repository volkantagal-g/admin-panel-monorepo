import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Typography } from 'antd';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';

import { Creators } from '../../redux/actions';

const { Paragraph } = Typography;

const ExcelExport = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState();
  const dispatch = useDispatch();

  const handleDateChange = value => {
    setDate(value);
  };

  const exportExcel = () => {
    dispatch(
      Creators.exportCourierSlotCapacityExcelRequest({ startDate: date[0].startOf('day').toISOString(), endDate: date[1].endOf('day').toISOString() }),
    );
  };

  return (
    <div>
      <Paragraph strong>{t('global:DOWNLOAD')}</Paragraph>
      <DatePicker.RangePicker value={date} onChange={handleDateChange} />
      <Button type="primary" onClick={exportExcel} disabled={!date}>
        <CloudDownloadOutlined />
      </Button>
    </div>
  );
};

export default memo(ExcelExport);
