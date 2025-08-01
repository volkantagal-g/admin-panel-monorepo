import { Space, Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  PlusOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { Creators } from '../../../redux/actions';

const { Option } = Select;
const ActiveParamButtons = ({ activeKey, paramsLength, activeParamIndex }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('global');
  const classes = useStyles();

  const renderPaginateButtons = () => {
    const indexes = [];
    for (let i = 0; i < paramsLength; i+= 1) {
      indexes.push(i);
    }
    return indexes.map(activeIndex => <Button 
      key={activeIndex} 
      className={activeParamIndex === activeIndex ? classes.activeButton : classes.paginateButton}
      onClick={() => dispatch(Creators.setActiveParamIndex({ activeKey, activeIndex }))}
    >{activeIndex + 1}</Button>);
  };

  const handleOptionChange = mergeType => {
    dispatch(Creators.setMergeType({ activeKey, mergeType }));
  };

  const handleRemoveParam = () => {
    dispatch(Creators.removeParam({ activeKey }));
  };

  const addNewParam = () => {
    dispatch(Creators.addNewParam({ activeKey }));
  };

  const showButtons = paramsLength > 1;

  return (
    <Space className={classes.container}>
      {showButtons && <div>
        {renderPaginateButtons()}
      </div>}

      {showButtons && <Select 
        defaultValue="and" 
        onChange={handleOptionChange}
        className={classes.selectWrapper}
      >
        <Option value="and">{t("AND")}</Option>
        <Option value="or">{t("OR")}</Option>
      </Select>}

      <Button className={classes.plusButton} onClick={addNewParam}>
        <PlusOutlined />
      </Button>
      {showButtons && <Button className={classes.closeButton} onClick={handleRemoveParam}>
        <CloseOutlined />
      </Button>}
    </Space>
  );
};

export default ActiveParamButtons;
