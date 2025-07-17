import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';

import { Button, Checkbox } from '@shared/components/GUI';
import useStyles from './styles';
import AddOrUpdateTodoModal from './Modal';
import { isModalOpenSelector, getActiveTodoSelector, getIsNewTodoSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import { Creators as ProgressCreators } from '../../redux/actions';
import Card from '../Card';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage } from '@shared/hooks';
import { reduxKey } from './constants';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { getInitialValues } from './Modal/formHelper';

const TodoList = ({ todos, isPending, disabled, mentorshipRequestId }) => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { t } = useTranslation(['mentorshipPage', 'global']);
  const classes = useStyles();
  const isModalOpen = useSelector(isModalOpenSelector);
  const isNewTodo = useSelector(getIsNewTodoSelector.getData);
  const activeTodo = useSelector(getActiveTodoSelector.getData);
  const isUpdate = !isNewTodo && !!activeTodo;

  const handleTodoOnClick = todo => {
    dispatch(Creators.setActiveTodo({ todo }));
    dispatch(Creators.openModal());
  };

  const handleAddNewBtnClick = () => {
    dispatch(Creators.setIsNewTodo({ isNew: true }));
    dispatch(Creators.openModal());
  };

  const handleAddOrUpdateTodoClose = () => {
    dispatch(Creators.setIsNewTodo({ isNew: false }));
    dispatch(Creators.closeModal());
  };

  const handleAddOrUpdateTodo = todo => {
    dispatch(ProgressCreators.addOrUpdateMentorshipTodoRequest({
      body: {
        ...todo,
        mentorshipRequest: mentorshipRequestId,
        isUpdate,
      },
    }));
  };

  return (
    <Card title={t('TO_DO_LIST')}>
      <div className={`${classes.root} ${todos?.length && 'pb-3'}`}>
        {todos?.map(todo => (
          <Button
            key={todo?._id}
            color="default"
            disabled={disabled}
            className={classes.todoItem}
            onClick={() => handleTodoOnClick(todo)}
          >
            <Checkbox checked={todo?.completedDate} fontSize={16} className={classes.checkbox} disabled={disabled}>
              {todo?.todo}
            </Checkbox>
            <span className={classes.deadline}>{moment(todo?.deadline).format('DD.MM.YYYY')}</span>
          </Button>
        ))}
      </div>
      <Button
        size="small"
        className="w-100"
        icon={<PlusOutlined />}
        onClick={handleAddNewBtnClick}
        disabled={disabled}
      >
        {t('ADD_NEW_TASK')}
      </Button>
      {(isNewTodo || activeTodo) && (
      <AddOrUpdateTodoModal
        isOpen={isModalOpen}
        todo={activeTodo && getInitialValues(activeTodo)}
        onSubmit={handleAddOrUpdateTodo}
        onClose={handleAddOrUpdateTodoClose}
        isPending={isPending}
        isUpdate={isUpdate}
      />
      )}
    </Card>
  );
};

export default TodoList;
