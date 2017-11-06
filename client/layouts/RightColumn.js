import React from 'react';
import { Grid, Input } from 'semantic-ui-react';

class RightColumn extends React.Component {
  render() {
    return (
      <Grid.Column width={11} style={{}}>
        <div>Grid Colimn 2 {this.props.children}</div>
        <Input placeholder="Write a message..." style={{ flexGrow: 0, paddingBottom: '24px' }}>
          <input />
        </Input>
      </Grid.Column>
    );
  }
}

export default RightColumn;
