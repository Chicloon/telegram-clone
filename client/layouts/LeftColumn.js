import React from 'react';
import { Grid, Input, Icon, Modal } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import ColumnHeaderWrapper from './ColumnHeaderWrapper';

import ChannelsList from '../components/ChannelsList/';
import LeftMenu from './LeftMenu';
import styled from 'styled-components';

const LeftHeader = styled.div`
  align-self: center;
  flex-grow: 1;
  cursor: pointer;
  padding: 0 12px;
`;

class LeftComumn extends React.Component {
  state = {
    showMenu: false,
    newChannelModal: false,
  };

  menuTrigger = () => {  
    this.setState(state => ({ showMenu: !state.showMenu }));
  };

  logoutTrigger = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.props.history.push('/');   
  }

  newChannelModalTrigger = () => {
    this.menuTrigger();
    this.setState(state => ({ newChannelModal: !state.newChannelModal }));
  }

  render() {
    const { showMenu, newChannelModal} = this.state;
    return (
      <Grid.Column width={5} style={{ padding: 0 }}>
        <div>
          <ColumnHeaderWrapper>
            {showMenu && <LeftMenu logoutTrigger={this.logoutTrigger} newChannelModalTrigger={this.newChannelModalTrigger} />}
            <LeftHeader onClick={this.menuTrigger}>
              <Icon name={showMenu ? "remove" :  "sidebar"} size="large" style={{ margin: '0 40px 0 0', cursor: 'pointer' }} />
              <span>Telegram-clone</span>
            </LeftHeader>
          </ColumnHeaderWrapper>
          <div style={{ borderRight: '2px solid #E9EBED' }}>
            <Input
              fluid
              placeholder="Search..."
              iconPosition="left"
              style={{ flexGrow: 0, padding: '12px' }}
            >
              <Icon name="search" flipped="horizontally" style={{ left: 'auto' }} />
              <input style={{ background: '#F2F2F2' }} />
            </Input>
            <ChannelsList />
          </div>
        </div>
        <Modal size="tiny" open={newChannelModal} onClose={this.newChannelModalTrigger} style={{minHeight: '90vh'}} >          
            <ColumnHeaderWrapper>
              <span style={{flexGrow: 1, paddingLeft: '24px'}}> New Channel</span> <span onClick={this.newChannelModalTrigger} style={{ cursor: 'pointer', paddingRight: '24px'}}> Close </span>
            </ColumnHeaderWrapper>
            Modal content          
        </Modal>
      </Grid.Column>
    );
  }
}

export default withRouter(LeftComumn);
