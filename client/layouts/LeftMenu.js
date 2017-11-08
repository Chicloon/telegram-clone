import React from 'react';
import { Menu, Label, Input, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const MenuWrapper = styled.div`
  position: absolute;
  z-index: 1;
  min-width: 100%;
  background: #ffffff;
  border: 1px solid #b5c3d0;
  color: #42749b;
  top: 48px;
`;

const LeftMenu = ({menuTrigger}) => (
  <MenuWrapper>   
    <ul>
      <li>asdfasdf </li>
      <li>asdfasdf </li>
    </ul>
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
