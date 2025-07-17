import { useTranslation } from 'react-i18next';
import { Table } from 'antd';
import { useMemo } from 'react';

const Summary = ({ pageData }) => {
  const { t } = useTranslation();
  const { totalAvailable, totalDeleted } = useMemo(() => pageData.reduce((acc, data) => {
    acc.totalAvailable += data.locationStock;
    acc.totalDeleted += data.quantity;
    return acc;
  }, { totalAvailable: 0, totalDeleted: 0 }), [pageData]);
  if (pageData.length === 0) {
    return null;
  }
  return (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}>{t('global:TOTAL')}</Table.Summary.Cell>
      <Table.Summary.Cell index={1} />
      <Table.Summary.Cell index={2}>{totalAvailable.toFixed(3)}</Table.Summary.Cell>
      <Table.Summary.Cell index={3}>{totalDeleted.toFixed(3)}</Table.Summary.Cell>
    </Table.Summary.Row>
  );
};

export default Summary;
