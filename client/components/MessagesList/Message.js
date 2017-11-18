import React from 'react';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';

moment.locale('ru');

const Message = ({ message: { text, created_at, user: { username } } }) => (
  <div>
    <Comment style={{ padding: '7px 12px' }}>
      <Comment.Content>
        <Comment.Author style={{ display: 'flex', justifyContent: 'space-between' }}>
          {username} <span> {moment(created_at).format('HH:mm:ss DD MMM')}</span>
        </Comment.Author>

        <Comment.Text>{text}</Comment.Text>
      </Comment.Content>
    </Comment>
  </div>
);
export default Message;
