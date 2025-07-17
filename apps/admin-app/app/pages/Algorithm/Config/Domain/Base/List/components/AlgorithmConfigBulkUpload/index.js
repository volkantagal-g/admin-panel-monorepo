import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Col,
  Collapse,
  Space,
  Button,
  Alert,
  Modal,
} from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import FileUploader from '@shared/components/UI/FileUploader';
import { MIME_TYPE } from '@shared/shared/constants';

import { Creators } from '@app/pages/Algorithm/Config/Domain/Base/List/redux/actions';
import { bulkEditCsv, exportCsvSelector } from '@app/pages/Algorithm/Config/Domain/Base/List/redux/selectors';
import { bulkEditExampleRows, bulkEditExampleColumns } from './constants';

import useStyles from './styles';

const { Panel } = Collapse;

const AlgorithmConfigBulkUpload = ({ isDomain }) => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const dispatch = useDispatch();

  const isPending = useSelector(bulkEditCsv.getIsPending);

  const classes = useStyles({ isPending });

  const exportCsvSelectorIsPending = useSelector(exportCsvSelector.getIsPending);

  const handleConfirmSubmit = ({ base64File }) => {
    dispatch(Creators.bulkEditCsvRequest({ file: { base64File: base64File.split(',')[1] }, isDomain }));
  };

  const openConfirmModal = base64File => {
    Modal.confirm({
      title: t('BULK_EDIT_WITH_CSV'),
      content: t('BULK_UPLOAD_CONFIRM_MESSAGE'),
      icon: null,
      okText: t('CONFIRM'),
      cancelText: t('CANCEL'),
      onOk: () => handleConfirmSubmit({ base64File }),
      centered: true,
    });
  };

  const exportCsv = () => {
    dispatch(
      Creators.exportCsvRequest({
        rows: bulkEditExampleRows,
        fileName: 'fileName.csv',
        columns: bulkEditExampleColumns,
      }),
    );
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse>
          <Panel header={t('BULK_UPLOAD')} key="1">
            <Space direction="vertical" className="w-100">
              <div className={classes.card}>
                <Button className={classes.button} loading={isPending} type="primary">
                  <FileUploader
                    okText={t('global:UPLOAD_CSV')}
                    supportedFileTypes={[MIME_TYPE.CSV]}
                    modalTitle={t('BULK_EDIT_WITH_CSV')}
                    buttonText={(
                      <div className={classes.buttonText}>
                        {t('BULK_EDIT_WITH_CSV')}
                      </div>
                    )}
                    onOkayClick={openConfirmModal}
                    warningText={(
                      <Space direction="vertical" className="w-100">
                        <Button disabled={exportCsvSelectorIsPending} onClick={() => exportCsv()} icon={<CloudDownloadOutlined />}>
                          {t('EXPORT_EXAMPLE_BULK_EDIT_CSV')}
                        </Button>
                        <Alert className={classes.alert} message={t('BULK_UPLOAD_CSV_WARNING')} type="warning" showIcon />
                      </Space>
                    )}
                  />
                </Button>
              </div>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default AlgorithmConfigBulkUpload;
