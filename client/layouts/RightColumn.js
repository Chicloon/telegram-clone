import React from 'react';
import { Grid, Input, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { compose } from 'react-apollo';
import ColumnHeaderWrapper from './ColumnHeaderWrapper';

import SendMessage from '../components/SendMessage';
import MessagesList from '../components/MessagesList';
import RightHeader from '../components/RightHeader';

class RightColumn extends React.Component {
  render() {
    return (
      <Grid.Column width={11} style={{ padding: 0 }}>
        <RightHeader channelId={this.props.match.params.channelId} />

        <MessagesList channelId={this.props.match.params.channelId} />
        <SendMessage channelId={this.props.match.params.channelId} />
      </Grid.Column>
    );
  }
}

export default RightColumn;

// export default withRouter(RightColumn);
