import { memo, useState, useEffect } from 'react';
import { Collapse, Form, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';
import { getUser } from '@shared/redux/selectors/auth';
import CreateNoteForm from './CreateNoteForm';
import UpdateNoteForm from './UpdateNoteForm';
import useStyles from './styles';

const { Panel } = Collapse;

const Notes = ({
  getNotes,
  createNote,
  updateNote,
  notes = [],
  isPending = false,
  filters = {},
}) => {
  const { t } = useTranslation('notes');
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();
  const [form] = Form.useForm();
  const user = getUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedNote, setEditedNote] = useState({});

  useEffect(() => {
    dispatch(getNotes({ data: filters }));
  }, [dispatch, getNotes, filters]);

  const showEditNoteModal = note => () => {
    form.setFieldsValue({ message: note?.message });
    setEditedNote(note);
    setIsModalVisible(true);
  };

  const showNote = note => user?._id === note.from?._id;

  return (
    <Collapse activeKey="1">
      <Panel
        className={classes.noPanelPadding}
        header={t('global:NOTE')}
        key="1"
      >
        <Spin spinning={isPending}>
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
                {showNote(note) && updateNote && (
                  <EditOutlined onClick={showEditNoteModal(note)} />
                )}
              </li>
            ))}
            {createNote && (
              <li>
                <CreateNoteForm
                  className={classes.createNoteForm}
                  currentUser={user}
                  selectedUserId={id}
                  createNote={createNote}
                  filters={filters}
                />
              </li>
            )}
          </ul>

          <UpdateNoteForm
            form={form}
            note={editedNote}
            currentUser={user}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            updateNote={updateNote}
          />
        </Spin>
      </Panel>
    </Collapse>
  );
};

export default memo(Notes);
