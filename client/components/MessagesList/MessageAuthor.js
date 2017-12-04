import React from 'react';

const MessageAuthor = ({ username, id }) => {
  const handleClick = (e) => {
    console.log(e);
  };

  return <a onClick={handleClick}>{username}</a>;
};

export default MessageAuthor;
