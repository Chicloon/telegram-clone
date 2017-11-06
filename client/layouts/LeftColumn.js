import React from 'react';
import { Grid, Input, Icon } from 'semantic-ui-react';

const channelsList = [
  {
    id: 1,
    name: 'Bob',
    lastMessage: 'hello',
  },
  {
    id: 2,
    name: 'Jake',
    lastMessage: 'Hola',
  },
];

class LeftComumn extends React.Component {
  render() {
    return (
      <Grid.Column width={5} style={{ borderRight: '2px solid #E9EBED' }}>
        <Input placeholder="Search..." iconPosition="left" style={{ flexGrow: 0, padding: '12px' }}>
          <Icon name="search" flipped="horizontally" style={{ left: 'auto' }} />
          <input style={{ background: '#F2F2F2' }} />
        </Input>
        <div>
          <ul>
            {channelsList.map(e => (
              <li key={e.id}>
                <a href="#">
                  {e.name}: {e.lastMessage}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Grid.Column>
    );
  }
}

export default LeftComumn;
