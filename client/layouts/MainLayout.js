import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

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
              paddingBottom: '24px',
            }}
          >
            <Grid.Row
              columns={2}
              stretched
              style={{
                flex: '1 1 auto',
                padding: 0,
                background: 'white',
                boxShadow: '0px 1px 0 #dfe5ec',
                borderRadius: '0 0 3px 3px',
                borderLeft: '1px solid #dfe5ec',
                borderRight: '1px solid #dfe5ec',
                borderBottom: '1px solid #d2dbe3',
                overflow: 'hidden',
              }}
            >
              <LeftColumn />

              {this.props.children}
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Layout;
