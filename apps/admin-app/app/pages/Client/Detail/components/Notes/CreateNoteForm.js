import { memo, useState } from 'react';
import { Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Creators } from '@app/pages/Client/Detail/redux/actions';

const { Search } = Input;

const Notes = ({ currentUser, selectedUserId, className }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('clientDetail');
  const [message, setMessage] = useState('');

  const onChange = e => setMessage(e.target.value);

  const onSubmit = async() => {
    // TODO: custom button disabled but pressing enter from keyboard still goes here
    // we can show toast if empty message
    if(!message?.trim()) {
      return;
    }
    const data = {
      "from": {
        "_id": currentUser._id,
        "name": currentUser.name,
      },
      to: selectedUserId,
      toType: "Client",
      message,
    };
    await dispatch(Creators.createClientNoteRequest({ data }) );
    setMessage('');
  };

  return (
    <Search
      className={className}
      placeholder={`${t("CLIENT_META.NOTE.ADD")}...`}
      onChange={onChange}
      onSearch={onSubmit}
      value={message}
      enterButton={
        <Button disabled={!message.trim()} type="primary">
          {t("CLIENT_META.NOTE.POST")}
        </Button>}
      size="large"
    />
  );
};

export default memo(Notes);
