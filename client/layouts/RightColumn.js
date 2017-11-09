import React from 'react';
import { Grid, Input, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { compose } from 'react-apollo';
import ColumnHeaderWrapper from './ColumnHeaderWrapper';

import SendMessage from '../components/SendMessage';

class RightColumn extends React.Component {
  render() {
    return (
      <Grid.Column width={11} style={{ padding: 0 }}>
        <ColumnHeaderWrapper>
          <div style={{ flexGrow: 2 }}> Channel name </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Icon name="search" size="large" style={{ cursor: 'pointer' }} />
            <Icon
              name="ellipsis vertical"
              size="large"
              style={{ marginLeft: '20px', cursor: 'pointer' }}
            />
          </div>
        </ColumnHeaderWrapper>
        <div>Grid Colimn 2: {this.props.match.params.channelId}</div>
        <SendMessage />
      </Grid.Column>
    );
  }
}

export default RightColumn;

// export default withRouter(RightColumn);
