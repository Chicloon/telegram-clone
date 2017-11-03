import React from 'react';
import { Icon, Grid } from 'semantic-ui-react';

class MainHeader extends React.Component {
  render() {
    return (
      <Grid.Row
        stretched
        columns={1}
        style={{
          background: '#5682a3',
          color: 'white',
          height: '48px',
          padding: 0,
        }}
      >
        <Grid.Column width={5} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <div style={{ alignSelf: 'center' }}>
            <Icon name="sidebar" size="large" style={{ margin: '0 40px 0 0', cursor: 'pointer' }} />
            <span>Telegram-clone</span>
          </div>
        </Grid.Column>
        <Grid.Column width={11} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <span style={{ alignSelf: 'center' }}> Channel name </span>
          <div style={{ alignSelf: 'center', display: 'flex', justifyContent: 'flex-end' }}>
            <Icon name="search" size="large" style={{ cursor: 'pointer' }} />
            <Icon
              name="ellipsis vertical"
              size="large"
              style={{ marginLeft: '20px', cursor: 'pointer' }}
            />
          </div>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default MainHeader;
