import React from 'react';
import { Popup } from 'semantic-ui-react';
import styled from 'styled-components';

const AuthorMenuWrapper = styled.div`
  position: absolute;
  z-index: 1;
  min-width: 33%;
  background: #ffffff;
  border: 1px solid #b5c3d0;
  color: #42749b;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & > * {
    cursor: pointer;
    width: 100%;
    margin: 0;
    padding: 2px;
    text-align: center;
    &: hover {
      background: #f2f6fa;
    }
  }
`;

class MessageAuthor extends React.Component {
  state = {
    showMenu: false,
  };

  renderAuthorMenu = () => (
    <AuthorMenuWrapper>
      <p
        onClick={() => {
          console.log('clicked menu item');
        }}
      >
        Send direct message
      </p>
    </AuthorMenuWrapper>
  );

  render() {
    const { username } = this.props;
    const { showMenu } = this.state;
    return (
      // eslint-disable-next-line
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          this.setState({ showMenu: true });
        }}
        onMouseLeave={() => {
          this.setState({ showMenu: false });
        }}
      >
        {username}
        {showMenu && this.renderAuthorMenu()}
      </div>
    );
  }
}

export default MessageAuthor;
