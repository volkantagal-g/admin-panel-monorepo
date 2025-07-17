/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { Modal, Button, Input, Table, Radio, Col, Row } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import { Creators } from './redux/actions';
import { CONFIG_PARAMETERS as configParameters } from './constants';
import { getUser } from '@shared/redux/selectors/auth';

import CityFilter from './components/cityFilter';
import PageTitle from './components/pageTitle';
import PopTitle from './components/popTitle';
import WarehouseFilter from './components/warehouseFilter';
import ConfigFilter from './components/configFilter';

import reducer from './redux/reducer';
import saga from './redux/saga';

import { getOnOffColumns } from './components/tableColumns';
import { cityFilterSelector, warehouseFilterSelector, stateSelector, configFilterSelector } from './redux/selectors';
import useStyles from './styles';

const OnOffPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { t } = useTranslation('onOffPage');

  const [configChangeReasonInput, setConfigChangeReasonInput] = useState(null);
  const [configToggle, setActionTypeButton] = useState(3);
  const [changedWarehouses, setChangedWarehouses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [configCityData, setConfigCityData] = useState([]);
  const [configWarehouseData, setConfigWarehouseData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const resultData = useSelector(stateSelector.getResultData || []);
  const selectedCities = useSelector(cityFilterSelector.getSelectedCities);
  const selectedCountries = useSelector(cityFilterSelector.getSelectedCountries);
  const selectedWarehouses = useSelector(warehouseFilterSelector.getSelectedWarehouses);
  const selectedConfig = useSelector(configFilterSelector.getSelectedConfig);

  const isPending = useSelector(stateSelector.getIsPending);
  const user = getUser();

  useEffect(() => {
    dispatch(Creators.getOnOffResultRequest());
  }, [dispatch]);

  const counterFilter = config => {
    const selected = [];
    resultData.map(obj => obj.children.map(element => element.children.map(child => {
      if (config.includes(child.config)) {
        selected.push(child);
      }
      return selected;
    })));
    return selected;
  };

  useEffect(() => {
    if (selectedWarehouses && selectedWarehouses.length > 0) {
      const selectedWarehouse = selectedWarehouses?.filter(
        obj => obj !== undefined,
      );
      const selected = [];
      resultData.map(obj => obj.children.map(element => element.children.map(child => {
        if (selectedWarehouse.includes(child.warehouse)) {
          selected.push(child);
        }
        return selected;
      })));
      setFilteredData(selected);
    }
    else if (selectedCities && selectedCities.length > 0) {
      const filterDict = {
        city: selectedCities,
        country: selectedCountries,
      };
      const filtered = resultData?.filter(element => element.children.some(subelement => filterDict?.country?.includes(subelement.country)))
        .map(element => element.children.filter(subelement => filterDict.city.includes(subelement.city)));
      const merged = [].concat([], ...filtered);
      setFilteredData(merged);
    }
    else if (selectedConfig && selectedConfig.length > 0) {
      const selected = counterFilter(selectedConfig);
      const arrayCity = [];
      selected.map(element => (arrayCity.includes(element.city) ? '' : arrayCity.push(element.city)));

      const arrayWarehouse = [];
      selected.map(element => (arrayWarehouse.includes(element.warehouse) ? '' : arrayWarehouse.push(element.warehouse)));

      setFilteredData(selected);
      setConfigCityData(arrayCity);
      setConfigWarehouseData(arrayWarehouse);
    }
    else {
      setFilteredData(resultData);
    }
  }, [resultData, selectedWarehouses, selectedCities, selectedCountries, selectedConfig, dispatch]);

  const handleModalCancel = () => setIsModalVisible(false);

  const handleModalOk = () => {
    if (changedWarehouses !== 0) {
      const changeConfigDict = {
        warehouse_list: changedWarehouses,
        config: configToggle,
        user_name: user.name,
        change_reason: configChangeReasonInput,
      };
      dispatch(Creators.setChangedConfig({ data: changeConfigDict }));
      dispatch(Creators.getOnOffResultRequest());
      setIsModalVisible(false);
    }
  };

  const confirm = () => {
    Modal.confirm({
      icon: <QuestionCircleOutlined className={classes.questionCircle} />,
      title: (
        <PopTitle
          changedWarehouses={changedWarehouses}
          configToggle={configToggle}
        />
      ),
      okText: t('YES'),
      cancelText: t('NO'),
      disabled: !configChangeReasonInput,
      onOk() {
        handleModalOk();
      },
      width: 1000,
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const x = selectedRows.filter(array => {
        return array.configId;
      });
      setChangedWarehouses(x);
    },
  };

  const handleToggleButtonChange = ({ target: { value } }) => {
    setActionTypeButton(value || configToggle);
  };

  return (
    <div className="app-content">
      <PageTitle />
      <Modal
        title={t('CHANGE_WAREHOUSE_CONFIG')}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        className={classes.configModalContainer}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            {t('CANCEL')}
          </Button>,
          <Button
            key="update"
            loading={isPending}
            disabled={!configChangeReasonInput}
            onClick={confirm}
          >
            {t('UPDATE')}
          </Button>,
        ]}
      >
        <Row justify="center" className={classes.radioContainer}>
          <Radio.Group
            className={classes.radioGroup}
            value={configToggle}
            onChange={handleToggleButtonChange}
            defaultValue="3"
          >
            {Object.entries(configParameters).map(([key, value]) => {
              return (
                <Radio.Button
                  className={classes.radioButton}
                  key={value}
                  value={parseInt(key, 10)}
                >
                  {' '}
                  {value}
                </Radio.Button>
              );
            })}
          </Radio.Group>
          <Input
            className={classes.configInput}
            placeholder={t('CONFIG_CHANGE_REASON')}
            onChange={e => setConfigChangeReasonInput(e.target.value)}
          />
        </Row>
      </Modal>
      <Row justify="space-around" className={classes.gridButtonsContainer}>
        <Col className={classes.gridItemButton}>
          <Button
            onClick={() => setIsModalVisible(true)}
            disabled={changedWarehouses.length === 0 || isPending}
            className={classes.changeConfigButton}
          >
            {t('CHANGE_CONFIG')}
          </Button>
        </Col>
        <Col className={classes.gridTableTitle}>
          <ConfigFilter countData={Object.values(configParameters).map(element => (
            counterFilter([element]).length
          ))}
          />
          <CityFilter configData={configCityData} />
          <WarehouseFilter configData={configWarehouseData} />
        </Col>
      </Row>
      <Table
        className={classes.onOffTable}
        columns={getOnOffColumns(t)}
        dataSource={filteredData || []}
        loading={isPending}
        pagination={false}
        rowSelection={{ ...rowSelection, checkStrictly: false }}
        scroll={{ y: 550 }}
        expandable={{ defaultExpandAllRows: true }}
      />
    </div>
  );
};

const reduxKey = REDUX_KEY.ON_OFF_PROMO_CONFIG;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(OnOffPage);
