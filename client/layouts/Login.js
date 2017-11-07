import React from 'react';
import { withFormik } from 'formik';
import Yup from 'yup';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import normalizeErrors from './normalizeErrors';

class Login extends React.Component {
  render() {
    const {
      values,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      dirty,
    } = this.props;

    const errorsValues = Object.values(errors);

    return (
      <div className="login-form">
        <style>
          {`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;`}
        </style>
        <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large" onSubmit={handleSubmit}>
              <Segment stacked>
                <Form.Input
                  id="email"
                  name="email"
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={!!errors.email}
                />

                <Form.Input
                  fluid
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={!!errors.password}
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Button disabled={!dirty || errorsValues.length !== 0} color="teal" fluid size="large" type="submit">
                  Login
                </Button>
              </Segment>
            </Form>
            {errorsValues.length !== 0 && (
              <Message negative>
                <ul style={{ listStyle: 'none' }}>
                  {errorsValues.map(error => <li key={error}>{error}</li>)}
                </ul>
              </Message>
            )}
            <Message>
              New to us? <Link to="/signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(loginMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
      password: Yup.string().required('Password is required!'),
    }),

    handleSubmit: async (values, { props: { mutate }, setSubmitting, setErrors }) => {
      const response = await mutate({
        variables: { email: values.email, password: values.password },
      });

      const { ok, errors } = response.data.login;
      if (ok) {
        setSubmitting(false);
      } else {
        console.log(errors);
        setErrors(normalizeErrors(errors));
        setSubmitting(false);
      }
      setSubmitting(false);
    },
  }),
)(Login);
