import { memo, useState, useEffect } from 'react';
import { Collapse, Form, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';
import { getUser } from '@shared/redux/selectors/auth';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import { noteSelector } from '@app/pages/Client/Detail/redux/selectors';
import CreateNoteForm from './CreateNoteForm';
import UpdateNoteForm from './UpdateNoteForm';
import useStyles from './styles';

const { Panel } = Collapse;
const COLLAPSE_KEY_PREFIX = 'CLIENT_DETAIL_NOTES_COMPONENT_COLLAPSE_';

const Notes = ({ t, client }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const notes = useSelector(noteSelector.getNotes);
  const isPending = useSelector(noteSelector.isPending);
  const classes = useStyles();
  const [form] = Form.useForm();
  const user = getUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedNote, setEditedNote] = useState({});
  
  useEffect(() => {
    if (!client?._id) return;
    dispatch(Creators.getClientNotesRequest({ data: { to: client._id, toType: 'Client' } }));
  }, [dispatch, client]);

  const showEditNoteModal = note => () => {
    form.setFieldsValue({ message: note?.message });
    setEditedNote(note);
    setIsModalVisible(true);
  };

  const showNote = note => user?._id === note.from?._id;

  return (
    <Collapse activeKey={`${COLLAPSE_KEY_PREFIX}1`}>
      <Panel
        showArrow={false}
        className={classes.noPanelPadding}
        header={t("global:NOTE")}
        key={`${COLLAPSE_KEY_PREFIX}1`}
      >
        <Spin spinning={!client?._id || isPending}>
          <ul className={classes.notes}>
            {notes?.map(note => (
              <li key={note._id}>
                <div className={classes.note}>
                  <div className={classes.title}>
                    {note.from?.name}
                    <span>&nbsp;at {moment(note.createdAt).format(DEFAULT_TIME_FORMAT)}</span>
                    {note.updatedBy && (
                      <span>
                        &nbsp;- last edit: {moment(note.updatedBy?.updatedAt).format(DEFAULT_TIME_FORMAT)}
                        &nbsp;by {note.updatedBy?.name}
                      </span>
                    )}
                  </div>
                  <div className={classes.message}>
                    {note?.message}
                  </div>
                </div>
                {showNote(note) && (
                  <EditOutlined onClick={showEditNoteModal(note)} />
                )}
              </li>
            ))}
            <li>
              <CreateNoteForm className={classes.createNoteForm} currentUser={user} selectedUserId={id} />
            </li>
          </ul>

          <UpdateNoteForm
            form={form}
            note={editedNote}
            currentUser={user}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        </Spin>
      </Panel>
    </Collapse>
  );
};

export default memo(Notes);