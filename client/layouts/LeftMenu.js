import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, Label, Input, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuWrapper = styled.ul`
  position: absolute;
  z-index: 1;
  min-width: 100%;
  background: #ffffff;
  border: 1px solid #b5c3d0;
  color: #42749b;
  top: 48px;
  list-style: none;
  margin: 0;
  padding: 0;
  & > li {
    cursor: pointer;
    padding: 11px 19px 10px 21px;
    &: hover {
      background: #f2f6fa;
    }
  }
`;

class LeftMenu extends React.Component {
  componentWillMount() {
    // add event listener for clicks
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    // make sure you remove the listener when the component is destroyed
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = (e) => {
    // eslint-disable-next-line react/no-find-dom-node
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.props.menuTrigger();
    }
  };

  render() {
    const { newChannelModalTrigger, logoutTrigger } = this.props;
    return (
      <MenuWrapper>
        <li onClick={newChannelModalTrigger}>
          <Icon style={{ marginRight: '38px', marginTop: '3px' }} name="users" />{' '}
          <span> New channel </span>
        </li>
        <li onClick={logoutTrigger}>
          <Icon style={{ marginRight: '38px', marginTop: '3px' }} name="sign out" />{' '}
          <span> LogOut </span>
        </li>
      </MenuWrapper>
    );
  }
}
export default LeftMenu;
