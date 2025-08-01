import _ from 'lodash';
import { Typography } from 'antd';

import { getLangKey, t } from '@shared/i18n';
import { DetailButton } from '@shared/components/UI/List';

const { Text } = Typography;

export const tableColumns = [
  {
    title: t('marketFranchisePage:WAREHOUSE'),
    key: 'name',
    render: obj => {
      return (<Text>
        {_.get(obj, 'name')}
        <Text type="secondary" code>
          {_.get(obj, `city.name.${getLangKey()}`)}
        </Text>
      </Text>);
    },
  },
  {
    title: t('marketFranchisePage:DETAIL'),
    key: '_id',
    width: "10%",
    render: obj => {
      return DetailButton({
        _id: _.get(obj, '_id'),
        urlPath: '/warehouse/detail/',
      });
    },
  },
];
