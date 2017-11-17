import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withFormik } from 'formik';
import Yup from 'yup';
import gql from 'graphql-tag';

import { Form } from 'semantic-ui-react';

const SendMessage = ({
  values, errors, handleChange, handleBlur, handleSubmit, isSubmitting,
}) => (
  <Form style={{ flexGrow: 0, padding: '24px' }}>
    <input
      onKeyDown={(e) => {
        if (e.keyCode === 13 && !isSubmitting) {
          handleSubmit(e);
        }
      }}
      placeholder="Write a message..."
      id="message"
      name="message"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.message}
    />
    {errors.message && errors.message}
  </Form>
);

const crateMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export default compose(
  graphql(crateMessageMutation),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      message: Yup.string().max(1000, 'Message must be less then ${max} chars long'),
    }),

    handleSubmit: async (
      values,
      {
        props: { mutate, channelId }, setSubmitting, setErrors, resetForm,
      },
    ) => {
      if (values.message.length > 0) {
        await mutate({
          variables: { channelId, text: values.message },
        });
        setSubmitting(false);
        resetForm();
      }
      setSubmitting(false);
    },
  }),
)(SendMessage);
