import React from 'react';
import { Comment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { UsersDirectMessagesQuery } from '../queries';

const DMessageList = ({ data: { usersDirectMessages, loading } }) => {
  // const { id, name, lastMessage } = channel;
  // console.log(usersDirectMessages);
  console.log(usersDirectMessages);
  if (!loading) {
    return (
      <Comment.Group>
        {usersDirectMessages.map(directMessage => (
          <Link key={`directMessage-${directMessage.id}`} to={`/directMessage/${directMessage.id}`}>
            <Comment style={{ padding: '7px 12px' }}>
              <Comment.Content>
                <Comment.Author as="span">{directMessage.title}</Comment.Author>
                <Comment.Metadata style={{ position: 'absolute', right: '12px' }}>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                {/* <Comment.Text></Comment.Text> */}
              </Comment.Content>
            </Comment>
          </Link>
        ))}
      </Comment.Group>
    );
  }
  return <div />;
};

export default graphql(UsersDirectMessagesQuery)(DMessageList);
