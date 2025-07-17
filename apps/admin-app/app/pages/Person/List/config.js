import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { DetailButton } from '@shared/components/UI/List';
import ImageWithPopover from '@shared/components/UI/ImageWithPopover';
import { IMAGE_HEIGHT } from './constants';
import { showStatus } from './utils';

export const getTableColumns = ({ t, Can }) => {
  return [
    {
      title: t('IMAGE'),
      dataIndex: 'picURL',
      key: 'picURL',
      width: '60px',
      render: image => {
        return (
          <ImageWithPopover src={image} height={IMAGE_HEIGHT} />
        );
      },
    },
    {
      title: t('NAME'),
      dataIndex: 'name',
      key: 'name',
      width: '140px',
    },
    {
      title: t('GSM'),
      dataIndex: 'gsm',
      key: 'gsm',
      width: '120px',
    },
    {
      title: t('PERSONAL_GSM'),
      dataIndex: 'personalGsm',
      key: 'personalGsm',
      width: '120px',
    },
    {
      title: t('ACTIVENESS'),
      dataIndex: 'isActivated',
      key: 'isActivated',
      width: '80px',
      render: isActivated => showStatus({ isActivated, t }),
    },
    {
      title: t('COURIER_POOL'),
      dataIndex: 'isReservable',
      key: 'isReservable',
      width: '80px',
      render: isReservable => showStatus({ isReservable, t }),
    },
    {
      title: t('TRAINING'),
      dataIndex: 'trainings',
      key: 'trainings',
      width: '80px',
      render: trainings => showStatus({ trainings, t }),
    },
    {
      title: '',
      key: '_id',
      width: '120px',
      render: obj => (
        <Can permKey={permKey.PAGE_PERSON_DETAIL}>
          <DetailButton
            _id={obj._id}
            urlPath={ROUTE.PERSON_DETAIL.path.replace(':id', '')}
            toLat={obj?.homeAddress?.location?.coordinates?.[1]}
            toLng={obj?.homeAddress?.location?.coordinates?.[0]}
          />
        </Can>
      ),
    },
  ];
};
