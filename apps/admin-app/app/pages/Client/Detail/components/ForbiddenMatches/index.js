import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { Collapse } from 'antd';

import AntTable from '@shared/components/UI/AntTable';
import { Creators } from '../../redux/actions';
import { clientSelector, forbiddenMatchSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import useStyles from './styles';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_FORBIDDEN_MATCHES_COMPONENT_COLLAPSE_';

const ForbiddenMatches = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('clientDetail');

  const client = useSelector(clientSelector.getClient);
  const forbiddenMatches = useSelector(forbiddenMatchSelector.getForbiddenMatches);
  const isPending = useSelector(forbiddenMatchSelector.isPending);

  const handleActivenessButtonClick = forbiddenMatch => {
    dispatch(Creators.updateClientForbiddenMatchRequest({
      data: {
        clientId: _.get(forbiddenMatch, 'client'),
        forbiddenMatchId: _.get(forbiddenMatch, '_id'),
        isActive: !_.get(forbiddenMatch, 'isActive'),
        person: _.get(forbiddenMatch, 'person._id'),
        description: _.get(forbiddenMatch, 'description'),
      },
    }));
  };

  const clientId = _.get(client, '_id');
  const columns = tableColumns(handleActivenessButtonClick, t);

  useEffect(() => {
    if (clientId) {
      dispatch(Creators.getClientForbiddenMatchesRequest({ clientId }));
    }
  }, [clientId, dispatch]);

  return (
    <>
      <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`}>
        <Panel
          showArrow={false}
          className={classes.noPanelPadding}
          header={t("global:FORBIDDEN_MATCHES")}
          key={`${COLLAPSE_KEY_PREFIX}1`}
        >
          <AntTable
            data={forbiddenMatches}
            columns={columns}
            loading={isPending}
          />
        </Panel>
      </Collapse>
    </>
  );
};

export default ForbiddenMatches;
