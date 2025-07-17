import { useEffect, useState } from 'react';
import { Collapse, Space, Switch, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../../redux/actions';
import useStyles from './styles';

const { Text } = Typography;
const { Panel } = Collapse;

const Header = ({ title, titleClassName, isParent, activeKey }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('clientTargetingPage');

  const [checked, setChecked] = useState(false);

  const handleSwitchClick = (isEnabled, e) => {
    e.stopPropagation();
    setChecked(isEnabled);
    dispatch(Creators.setEnabledType({ activeKey, isEnabled }));
  };

  return (
    <div className={classes.collapseHeaderWrapper}>
      {!isParent && (
        <Switch
          className={checked ? classes.switchWrapperChecked : classes.switchWrapperUnchecked}
          onClick={handleSwitchClick}
          checkedChildren={t('ACTIVE')}
          unCheckedChildren={t('INACTIVE')}
        />
      )}
      <Text className={titleClassName}>{title}</Text>
    </div>
  );
};

const CollapsePanel = ({ header, titleClassName, activeKey, defaultActiveKey, children, isParent, triggerCollapseAction = false }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeKeyLocal, setActiveKeyLocal] = useState(defaultActiveKey);

  useEffect(() => {
    if (triggerCollapseAction) {
      setActiveKeyLocal(activeKey);
      // reset collapse trigger so next time if they trigger same key it works
      // a bit delay so nested collapses have time to to trigger
      setTimeout(() => {
        dispatch(Creators.setCollapseTriggeredKey({ activeKey: '' }));
      }, 200);
    }
  }, [triggerCollapseAction, activeKey, dispatch]);

  return (
    <Collapse
      className={isParent ? classes.parentCollapseWrapper : classes.defaultCollapseWrapper}
      activeKey={activeKeyLocal}
      onChange={selected => {
        setActiveKeyLocal(selected);
      }}
    >
      <Panel header={<Header title={header} titleClassName={titleClassName} isParent={isParent} activeKey={activeKey} />} key={activeKey}>
        <Space direction="vertical" className={classes.container}>
          {children}
        </Space>
      </Panel>
    </Collapse>
  );
};

export default CollapsePanel;
