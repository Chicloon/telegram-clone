import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import LeftColumn from './LeftColumn';

const MainLayout = (props) => {
  console.log(props);
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
            <Grid.Column width={5} style={{ padding: 0 }}>
              <LeftColumn history={props.history} />
            </Grid.Column>
            <Grid.Column width={11} style={{ padding: 0 }}>
              {props.children}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};
export default withRouter(MainLayout);
