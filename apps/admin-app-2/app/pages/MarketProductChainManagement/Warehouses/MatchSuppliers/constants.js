import { Button } from '@shared/components/GUI';
import leftArrowIcon from '@app/pages/MarketProductChainManagement/assets/Icons/left-arrow.svg';
import rightArrowIcon from '@app/pages/MarketProductChainManagement/assets/Icons/right-arrow.svg';

export const TABLE_FIELDS = Object.freeze({
  NAME: 'name',
  PRODUCTS_COUNT: 'productCount',
  RELATED_PLATFORM: 'relatedPlatform',
  MOVE: 'move',
  MOVE_BACK: 'moveBack',
});

export const getMatchedColumns = ({
  t,
  classes,
  renderPlatformCell,
  handleMoveToUnmatched,
}) => [
  {
    title: t('COLUMNS.NAME'),
    dataIndex: TABLE_FIELDS.NAME,
    key: TABLE_FIELDS.NAME,
    className: classes.columnName,
    render: text => (
      <div className={classes.tableCell}>
        <span className={classes.boldText}>{text}</span>
      </div>
    ),
  },
  {
    title: t('COLUMNS.PRODUCTS'),
    dataIndex: TABLE_FIELDS.PRODUCTS_COUNT,
    key: TABLE_FIELDS.PRODUCTS_COUNT,
    className: classes.columnProducts,
    render: value => (
      <div className={classes.tableCell}>
        {value ? value.toLocaleString() : '-'}
      </div>
    ),
  },
  {
    title: t('COLUMNS.PLATFORM'),
    dataIndex: TABLE_FIELDS.RELATED_PLATFORM,
    key: TABLE_FIELDS.RELATED_PLATFORM,
    className: classes.columnPlatform,
    render: (platforms, record) => (
      <div className={classes.tableCell}>
        {renderPlatformCell(platforms, record)}
      </div>
    ),
  },
  {
    title: '',
    key: TABLE_FIELDS.MOVE_BACK,
    className: classes.columnMove,
    render: (_, record) => (
      <div className={classes.tableCell}>
        <Button
          type="text"
          onClick={() => handleMoveToUnmatched(record)}
          icon={<img src={rightArrowIcon} alt="move to unmatched" className={classes.moveIcon} />}
          className={classes.moveButton}
        />
      </div>
    ),
  },
];

export const getUnmatchedColumns = ({
  t,
  classes,
  handleMoveToMatched,
}) => [
  {
    title: '',
    key: TABLE_FIELDS.MOVE,
    className: classes.columnMove,
    render: (_, record) => (
      <div className={classes.tableCell}>
        <Button
          type="text"
          onClick={() => handleMoveToMatched(record)}
          icon={<img src={leftArrowIcon} alt="move to matched" className={classes.moveIcon} />}
          className={classes.moveButton}
        />
      </div>
    ),
  },
  {
    title: t('COLUMNS.NAME'),
    dataIndex: TABLE_FIELDS.NAME,
    key: TABLE_FIELDS.NAME,
    className: classes.unmatchedColumnName,
    render: text => (
      <div className={classes.tableCell}>
        <span className={classes.boldText}>{text}</span>
      </div>
    ),
  },
  {
    title: t('COLUMNS.PRODUCTS'),
    dataIndex: TABLE_FIELDS.PRODUCTS_COUNT,
    key: TABLE_FIELDS.PRODUCTS_COUNT,
    className: classes.unmatchedColumnProducts,
    render: value => (
      <div className={classes.tableCell}>
        {value ? value.toLocaleString() : '-'}
      </div>
    ),
  },
];
