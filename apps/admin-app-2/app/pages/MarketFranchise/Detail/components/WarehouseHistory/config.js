import _ from 'lodash';
import moment from 'moment';
import { Typography } from 'antd';

import { getLangKey, t } from '@shared/i18n';
import { DetailButton } from '@shared/components/UI/List';
import { LOCAL_DATE_FORMAT } from '@shared/shared/constants';

const { Text } = Typography;

export const tableColumns = [
  {
    title: t('marketFranchisePage:WAREHOUSE'),
    key: 'name',
    render: obj => {
      return (<Text>
        {_.get(obj, 'warehouse.name')}
      </Text>);
    },
  },
  {
    title: t('marketFranchisePage:START_DATE'),
    key: 'name',
    render: obj => {
      const startDate = _.get(obj, 'startDate');
      const tempStartDate = moment(startDate).format(LOCAL_DATE_FORMAT[(getLangKey()).toUpperCase()]);
      return (<Text>
        {tempStartDate}
      </Text>);
    },
  },
  {
    title: t('marketFranchisePage:END_DATE'),
    key: 'name',
    render: obj => {
      const endDate = _.get(obj, 'endDate');
      const tempEndDate = moment(endDate).format(LOCAL_DATE_FORMAT[(getLangKey()).toUpperCase()]);
      return (<Text>
        {tempEndDate}
      </Text>);
    },
  },
  {
    title: t('marketFranchisePage:DETAIL'),
    key: '_id',
    width: "10%",
    render: obj => {
      return DetailButton({
        _id: _.get(obj, 'warehouse._id'),
        urlPath: '/warehouse/detail/',
      });
    },
  },
];
