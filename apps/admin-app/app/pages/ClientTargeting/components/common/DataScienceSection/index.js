import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Divider } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';

import { Creators } from '../../../redux/actions';
import CollapsePanel from '../CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';

import ErrorFallback from '@shared/components/UI/ErrorFallback';
import DataScienceModelSelect from './components/DataScienceModelSelect';
import DataScienceForm from './components/DataScienceForm';

const subSectionName = 'dataScience';
const getActiveKey = section => `${section}.${subSectionName}`;

const DataScienceSection = ({ section }) => {
  if (section && !Object.values(clientListSections).includes(section)) throw new Error('Invalid section key');
  const activeKey = getActiveKey(section);
  const dispatch = useDispatch();
  const { t } = useTranslation('clientTargetingPage');

  const clientListData = useSelector(getClientListData(activeKey));
  const { activeIndex } = clientListData;

  const selectedModel = clientListData.params[activeIndex]?.modelId;

  useEffect(() => {
    dispatch(Creators.initDataScienceField({ section }));
  }, [dispatch, section]);

  return (
    <CollapsePanel header={t('DATA_SCIENCE_SECTION')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <DataScienceModelSelect
              activeKey={activeKey}
              section={section}
              modelId={selectedModel}
            />
          </ErrorBoundary>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            resetKeys={[selectedModel]}
          >
            {selectedModel ? (
              <>
                <Divider />
                <DataScienceForm activeKey={activeKey} section={section} activeIndex={activeIndex} />
              </>
            ) : null}
          </ErrorBoundary>
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default DataScienceSection;
