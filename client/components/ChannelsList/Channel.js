import React from 'react';
import { Comment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Channel = ({ channel }) => {
  const { id, name, lastMessage } = channel;

  return (
    <Link to={`/channels/${id}`}>
      <Comment style={{ padding: '7px 12px' }}>
        <Comment.Content>
          <Comment.Author as="span">{name}</Comment.Author>
          <Comment.Metadata style={{ position: 'absolute', right: '12px' }}>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
          <Comment.Text>{lastMessage}</Comment.Text>
        </Comment.Content>
      </Comment>
    </Link>
  );
};

export default Channel;
