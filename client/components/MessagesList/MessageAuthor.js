import React from 'react';
import { Popup } from 'semantic-ui-react';
import styled from 'styled-components';

const AuthorMenuWrapper = styled.div`
  position: absolute;
  z-index: 1;
  background-color: red;
`;

const AuthorMenu = props => <AuthorMenuWrapper> asdfasd </AuthorMenuWrapper>;

class MessageAuthor extends React.Component {
  state = {
    showMenu: false,
  };

  menuTrigger = () => {
    this.setState(state => ({ showMenu: !state.showMenu }));
    console.log(this.state.showMenu);
  };

  render() {
    const { username, id } = this.props;
    const { showMenu } = this.state;
    return (
      <div>
        <a
          // onMouseEnter={this.menuTrigger}
          // onMouseLeave={this.setState({ showMenu: false })}
          onClick={this.menuTrigger}
          style={{ cursor: 'pointer' }}
        >
          {username}
        </a>
        {showMenu && <AuthorMenu />}
      </div>
    );
    // return (
    //   <Popup
    //     trigger={<a style={{ cursor: 'pointer' }}>{username}</a>}
    //     hideOnScroll
    //     on="click"
    //     position="bottom left"
    //     content="Add users to your feed"
    //   />
    // );
  }
}

export default MessageAuthor;
