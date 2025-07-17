import { Button, Dropdown, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getCurrentPageDocsSelector } from '@shared/redux/selectors/common';

import DocsMenu from './DocsMenu';
import useStyles from './styles';
import { inDevelopmentEnvironment } from '@shared/utils/common';
import ClipboardList from '../Icons/ClipboardList';

export default function PageDocsSection({ isSidebarCollapsed }) {
  const classes = useStyles({ isSidebarCollapsed, isDev: inDevelopmentEnvironment });
  const { t } = useTranslation('');
  return (
    <Dropdown
      overlay={<DocsMenu classes={classes} />}
      placement="bottomCenter"
      trigger={['click']}
      destroyPopupOnHide
    >
      <Button className={classes.button} id="headerDocsButton">
        <ClipboardList />
        {t('PAGE_INFO')}
        <NumberOfDocs classes={classes} />
      </Button>
    </Dropdown>
  );
}

function NumberOfDocs({ classes }) {
  const numberOfDocs = useSelector(getCurrentPageDocsSelector.getData)?.length || 0;
  const docsPending = useSelector(getCurrentPageDocsSelector.getIsPending);
  const docsError = useSelector(getCurrentPageDocsSelector.getError);

  if (docsPending) {
    return <div className={classes.numberPending}><Spin size="small" /></div>;
  }

  if (docsError) {
    return <div className={classes.noNumberOfDocs} />;
  }

  const formatted = numberOfDocs > 10 ? '10+' : numberOfDocs;

  return <div className={classes.numberOfDocs}>{formatted}</div>;
}
