import React from 'react';
import { withRouter } from 'react-router-dom';

import { Input } from 'semantic-ui-react';

const SendMessage = () => (
  <Input placeholder="Write a message..." style={{ flexGrow: 0, padding: '24px' }}>
    <input />
  </Input>
);

export default withRouter(SendMessage);
