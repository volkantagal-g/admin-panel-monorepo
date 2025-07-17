import { isNumber } from 'lodash';

import { COMPETITORS, RULE_NAME_TRANSLATER, RULE_TYPES_CONVERTER } from '../../constants';

export const rulesetColumns = [
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    width: 100,
    sorter: (a, b) => a.priority - b.priority,
    sortDirections: ['descend', 'ascend'],
    render: text => isNumber(text) && <div>{parseFloat(text + 1)}</div>,
  },
  {
    title: 'Rule Type',
    dataIndex: 'rule_type',
    key: 'rule_type',
    width: 100,
    sorter: (a, b) => a.rule_type - b.rule_type,
    sortDirections: ['descend', 'ascend'],
    render: text => RULE_NAME_TRANSLATER[text] && <div>{RULE_NAME_TRANSLATER[text]}</div>,
  },
  {
    title: 'Competitor',
    dataIndex: 'competitor_name',
    key: 'competitor_name',
    width: 100,
    sorter: (a, b) => a.competitor_name - b.competitor_name,
    sortDirections: ['descend', 'ascend'],
    render: text => COMPETITORS[text] && <div>{COMPETITORS[text?.toUpperCase()][0]}</div>,
  },
  {
    title: 'Rule Vaue',
    dataIndex: 'value',
    key: 'value',
    width: 100,
    sorter: (a, b) => a.value - b.value,
    sortDirections: ['descend', 'ascend'],
    render: (text, record) => (
      <div>
        {record.rule_type &&
          RULE_TYPES_CONVERTER.INDEX !== record.rule_type &&
          '%'}
        {text}
      </div>
    ),
  },
  {
    title: 'Inelastic Value',
    dataIndex: 'inelastic_value',
    key: 'inelastic_value',
    width: 100,
    render: (text, record) => (
      <div>
        {text &&
          record.rule_type &&
          RULE_TYPES_CONVERTER.INDEX !== record.rule_type &&
          '%'}
        {text}
      </div>
    ),
  },
];

export const guardrailColumns = [
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    width: 100,
    sorter: (a, b) => a.priority - b.priority,
    sortDirections: ['descend', 'ascend'],
    render: text => isNumber(text) && <div>{parseFloat(text + 1)}</div>,
  },
  {
    title: 'Rule Type',
    dataIndex: 'rule_type',
    key: 'rule_type',
    width: 100,
    sorter: (a, b) => a.rule_type - b.rule_type,
    sortDirections: ['descend', 'ascend'],
    render: text => RULE_NAME_TRANSLATER[text] && <div>{RULE_NAME_TRANSLATER[text]}</div>,
  },
  {
    title: 'Competitor',
    dataIndex: 'competitor_name',
    key: 'competitor_name',
    width: 100,
    sorter: (a, b) => a.competitor_name - b.competitor_name,
    sortDirections: ['descend', 'ascend'],
    render: text => COMPETITORS[text] && <div>{COMPETITORS[text?.toUpperCase()][0]}</div>,
  },
  {
    title: 'Min-Max Value',
    dataIndex: 'min',
    key: 'min',
    width: 100,
    // eslint-disable-next-line consistent-return
    render: (text, record) => {
      if (record?.max && RULE_TYPES_CONVERTER.INDEX === record.rule_type) {
        return (
          <>
            %{text}-{record?.max}
          </>
        );
      }
      if (
        record?.max &&
        record.rule_type &&
        RULE_TYPES_CONVERTER.PRICE_CHANGE === record.rule_type
      ) {
        return record?.max;
      }
      if (
        record?.min &&
        record.rule_type &&
        RULE_TYPES_CONVERTER.MIN_MARGIN === record.rule_type
      ) {
        return <>%{record?.min}</>;
      }
    },
  },
];
