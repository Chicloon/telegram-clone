import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';

import MainHeader from './MainHeader';
import LeftColumn from './LeftColumn';

class Layout extends React.Component {
  render() {
    return (
      <div style={{ background: '#e7ebf0', height: '100%' }}>
        <Container>
          <Grid
            style={{
              height: ' 100%',
              display: 'flex',
              flexFlow: 'column',
              margin: '0 -36px',
            }}
          >
            <MainHeader />

            <Grid.Row
              columns={2}
              stretched
              style={{ flex: '1 1 auto', padding: 0, background: 'white' }}
            >
              <LeftColumn />

              <Grid.Column width={11} style={{}}>
                Grid Colimn 2 {this.props.children}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Layout;
