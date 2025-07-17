import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { Form, Input } from 'antd';
import { debounce } from 'lodash';

import { CLIENT_APP_ACTION_TYPE } from '@shared/containers/Marketing/ClientAppActions/constants';
import { Creators } from '@shared/containers/Marketing/Select/GetirJobsPostDetailSelect/redux/actions';
import { REDUX_KEY, DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/GetirJobsPostDetailSelect/redux/saga';
import { postDetailSelector } from '@shared/containers/Marketing/Select/GetirJobsPostDetailSelect/redux/selectors';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/GetirJobsPostDetailSelect/redux/reducer';

const GetirJobsPostDetail = ({ form, disabled, postIdFieldName, postTypeFieldName, pageIdFieldName }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const isPending = useSelector(postDetailSelector.getIsPending);
  const [postTitle, setPostTitle] = useState(null);

  const onGetDetailFail = () => {
    form.setFields([{ name: postTypeFieldName, value: null }]);
    setPostTitle(null);
  };

  const onGetDetailSuccess = ({ jobType, jobPostTitle }) => {
    form.setFields([{ name: postTypeFieldName, value: jobType }]);
    setPostTitle(jobPostTitle);
  };

  useEffect(() => {
    dispatch(Creators.initContainer());
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  return (
    <>
      <Form.Item
        name={postIdFieldName}
        label={t('JOB_POST_ID')}
        className="d-inline"
        rules={[{ required: true, message: t('error:REQUIRED') }]}
      >
        <Input
          placeholder={`${t('JOB_POST_ID')}`}
          disabled={isPending || disabled}
          autoComplete="off"
          onChange={debounce(e => {
            const id = e.target.value;
            if (id.length > 3) {
              dispatch(Creators.getPostDetailRequest({ id, onGetDetailSuccess, onGetDetailFail }));
            }
          }, DEFAULT_DEBOUNCE_MS)}
        />
      </Form.Item>
      {postTitle && <p className="py-2 mb-0 "><b>{postTitle}</b></p>}
      <Form.Item
        name={postTypeFieldName}
        label={t('JOB_POST_TYPE')}
        className="d-inline"
        rules={[{ required: true, message: t('error:REQUIRED') }]}
      >
        <Input
          placeholder={`${t('JOB_POST_TYPE')}`}
          disabled
        />
      </Form.Item>
      {/* TODO: This field should'nt add with a static value it's realy unnecessary the responsible team should fix the action payload
       they should remove pageId instead of pageId they can separate actions with action.type field */}
      <Form.Item
        name={pageIdFieldName}
        label={t('ID')}
        className="d-none"
        rules={[{ required: true, message: t('error:REQUIRED') }]}
        initialValue={CLIENT_APP_ACTION_TYPE.GETIR_JOBS_POST_DETAIL}
      >
        <Input
          placeholder={`${t('ID')}`}
          disabled
        />
      </Form.Item>
    </>

  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.POST_DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(GetirJobsPostDetail);
