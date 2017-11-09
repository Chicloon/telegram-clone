import React from 'react';
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

const LeftMenu = ({newChannelModalTrigger, logoutTrigger}) => (
  <MenuWrapper>
    <li onClick={newChannelModalTrigger}>
      <Icon style={{marginRight: '38px', marginTop: '3px'}} name="users" /> <span> New channel </span>
    </li>
    <li onClick={logoutTrigger}>
      <Icon style={{marginRight: '38px', marginTop: '3px'}} name="sign out" /> <span> LogOut </span>
    </li>
  </MenuWrapper>

  // <Menu vertical stu>
  //   <Menu.Item name="inbox">
  //     <Label color="teal">1</Label>
  //     Inbox
  //   </Menu.Item>

  //   <Menu.Item name="spam">
  //     <Label>51</Label>
  //     Spam
  //   </Menu.Item>

  //   <Menu.Item name="updates">
  //     <Label>1</Label>
  //     Updates
  //   </Menu.Item>
  // </Menu>
);

export default LeftMenu;
