import React from 'react';
import { withRouter } from 'react-router-dom';

import { Input, Form } from 'semantic-ui-react';

const SendMessage = () => (
  <Form style={{ flexGrow: 0, padding: '24px' }}>
    <input placeholder="Write a message..." />
  </Form>
);

export default withRouter(SendMessage);
