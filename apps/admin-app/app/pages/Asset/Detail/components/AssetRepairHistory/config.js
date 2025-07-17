import moment from 'moment';

import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { ASSET_REPAIR_HISTORY_CURRENCY_SYMBOLS } from '@app/pages/Asset/constants';
import AssetRepairHistoryButton from '../AssetRepairHistoryButton';
import { currencyFormat } from '@shared/utils/localization';
import permKey from '@shared/shared/permKey.json';
import { getSelectedCountryCurrencyAlpha } from '@shared/redux/selectors/countrySelection';

export const tableColumns = ({ t, canAccess }) => [
  {
    title: t('REPAIR_DATE'),
    dataIndex: 'repairDate',
    key: 'repairDate',
    width: 150,
    render: repairDate => (repairDate ? moment(repairDate).format(DEFAULT_DATE_FORMAT) : ''),
  },
  {
    title: t('REPAIR_COST'),
    key: 'repairCost',
    width: 150,
    render: record => `${record.currencyType ? ASSET_REPAIR_HISTORY_CURRENCY_SYMBOLS[record.currencyType] : ''}
    ${record.repairCost ? currencyFormat().format(record.repairCost).replace(getSelectedCountryCurrencyAlpha(), '') : ''}
    `,
  },
  {
    title: t('REPAIR_INVOICE_NUMBER'),
    dataIndex: 'repairInvoiceNumber',
    key: 'repairInvoiceNumber',
    width: 150,
    render: repairInvoiceNumber => repairInvoiceNumber || '',
  },
  {
    title: t('REPAIR_NOTES'),
    dataIndex: 'repairNotes',
    key: 'repairNotes',
    width: 150,
    render: repairNotes => repairNotes,
  },
  {
    title: t('assetPage:ACTION'),
    align: 'right',
    width: 100,
    render: record => canAccess(permKey.PAGE_EMPLOYEE_ASSET_DETAIL_COMPONENT_EDIT_GENERAL_INFO) && <AssetRepairHistoryButton record={record} />
    ,
  },
];
