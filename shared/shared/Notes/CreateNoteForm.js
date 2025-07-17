import { memo, useState } from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const { Search } = Input;

const Notes = ({ currentUser, className, createNote, filters }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('notes');
  const [message, setMessage] = useState('');

  const onChange = e => setMessage(e.target.value);

  const onSubmit = async() => {
    const data = {
      "from": {
        "_id": currentUser._id,
        "name": currentUser.name,
      },
      message,
      to: filters.to,
      toType: filters.toType,
    };
    await dispatch(createNote({ data }) );
    setMessage('');
  };

  return (
    <Search
      className={className}
      placeholder={`${t("ADD")}...`}
      onChange={onChange}
      onSearch={onSubmit}
      value={message}
      enterButton={t("POST")}
      size="large"
    />
  );
};

export default memo(Notes);