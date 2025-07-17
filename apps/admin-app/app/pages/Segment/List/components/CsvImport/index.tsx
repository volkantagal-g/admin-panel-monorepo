import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { has, isEmpty } from 'lodash';
import { Button, Popconfirm } from 'antd';

import CsvImporter from '@shared/components/UI/CsvImporter';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Creators } from '../../redux/actions';

function CsvImport({ segment }) {
  const dispatch = useDispatch();
  const { t } = useTranslation('segment');

  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const [clientIds, setClientIds] = useState([]);
  const [loadedFile, setLoadedFile] = useState();
  const [loadedBase64File, setLoadedBase64File] = useState();

  // not using selectors for these as they have to be local to this component
  const [addIsPending, setAddIsPending] = useState(false);
  const [removeIsPending, setRemoveIsPending] = useState(false);

  return (
    (clientIds && clientIds.length > 0) || addIsPending || removeIsPending ? (
      <>
        <Popconfirm
          title={t('CONFIRM.ADDING_SEGMENT_TO_CLIENTS')}
          onConfirm={handleAddClientsOnClick}
          okText={t('button:YES')}
        >
          <Button size="small" type="primary" loading={addIsPending}>{t('button:ADD')}</Button>
        </Popconfirm>&nbsp;
        <Popconfirm
          title={t('CONFIRM.REMOVING_SEGMENT_FROM_CLIENTS')}
          onConfirm={handleRemoveClientsOnClick}
          okText={t('button:YES')}
        >
          <Button size="small" type="primary" danger loading={removeIsPending}>{t('button:REMOVE')}</Button>
        </Popconfirm>
      </>
    ) : (
      <Button onClick={() => setIsCSVModalOpen(true)} size="small" disabled={!segment.segment}>
        <CsvImporter
          modalProps={{ title: t('global:UPLOAD_CSV'), okText: t('button:UPLOAD') }}
          onOkayClick={handleCSVImportOnOkayClick}
          importButtonText={t('ADD_OR_REMOVE_CLIENTS')}
          exampleCsv={{ client: 'id' }}
          isVisible={isCSVModalOpen}
          exampleTableProps={{
            className: null,
            scroll: { x: '100vw', y: 240 },
          }}
          incrementalParsing
        />
      </Button>
    )
  );

  function handleAddClientsOnClick() {
    setAddIsPending(true);

    dispatch(Creators.addSegmentToClientsRequest({ loadedBase64File, segment: segment.segment, loadedFile, onFinish: () => setAddIsPending(false) }));
    resetState();
  }

  function handleRemoveClientsOnClick() {
    setRemoveIsPending(true);

    const ids = clientIds.map(({ client }) => client);
    dispatch(Creators.removeSegmentFromClientsRequest({
      pendingMessage: (chunkSize: number) => t('REMOVE_SEGMENT_FROM_CLIENTS_PENDING_MESSAGE', { chunkSize }),
      clientIds: ids,
      segment: segment.segment,
      onFinish: () => setRemoveIsPending(false),
    }));
    resetState();
  }

  function handleCSVImportOnOkayClick({ data }, file, base64file) {
    if (isEmpty(data) || !has(data[0], 'client')) {
      return dispatch(ToastCreators.error({ message: t('ERR_CHECK_CSV_FORMAT'), toastOptions: { autoClose: 3000 } }));
    }
    setClientIds(data);
    setLoadedFile(file);
    setLoadedBase64File(base64file);
    setIsCSVModalOpen(false);

    return null;
  }

  function resetState() {
    setClientIds([]);
    setLoadedFile();
    setLoadedBase64File();
  }
}

export default CsvImport;
