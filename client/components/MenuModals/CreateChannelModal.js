import React from 'react';
import { Input, Modal, Button, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import { withFormik } from 'formik';
import Yup from 'yup';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import normalizeErrors from '../../normalizeErrors';

import ColumnHeaderWrapper from '../../layouts/ColumnHeaderWrapper';

import { AllChannelsQuery } from '../queries';

const CreateChannelButtonsWrapper = styled.div`
  padding-bottom: 12;
  display: flex;
  justify-content: space-around;
`;

const CreateChannelModal = ({
  open,
  onClose,
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  dirty,
  resetForm,
}) => {
  const errorsValues = Object.values(errors);

  const closeAndReset = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal size="tiny" style={{ marginTop: '-30vh' }} open={open} onClose={closeAndReset}>
      <ColumnHeaderWrapper>
        <span style={{ flexGrow: 1, paddingLeft: '24px' }}> New Channel</span>
        <span onClick={closeAndReset} style={{ cursor: 'pointer', paddingRight: '24px' }}>
          Close
        </span>
      </ColumnHeaderWrapper>
      <div style={{ padding: '12px' }}>
        <form onSubmit={handleSubmit}>
          <Input
            autoFocus
            fluid
            placeholder="New channel name"
            id="channelName"
            name="channelName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.channelName}
            error={!!errors.channelName}
          />
          {errorsValues.length !== 0 && (
            <Message negative>
              <ul style={{ listStyle: 'none' }}>
                {errorsValues.map(error => <li key={error}>{error}</li>)}
              </ul>
            </Message>
          )}
          <CreateChannelButtonsWrapper>
            <Button
              disabled={errorsValues.length !== 0}
              primary
              style={{ width: '50%', marginTop: '12px' }}
              type="submit"
            >
              Create
            </Button>
          </CreateChannelButtonsWrapper>
        </form>
      </div>
    </Modal>
  );
};

const createChannelMutation = gql`
  mutation($name: String!) {
    createChannel(name: $name) {
      ok
      errors {
        message
      }
      channel {
        name
        id
      }
    }
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ channelName: '' }),
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      channelName: Yup.string()
        .required('Channel name is required!')
        .min(5, 'Channel name must be a least ${min} chars long')
        .max(20, 'Channel name must be less then ${max} chars long'),
    }),

    handleSubmit: async (
      values,
      {
        props: { mutate, onClose }, setSubmitting, setErrors, resetForm,
      },
    ) => {
      const response = await mutate({
        variables: { name: values.channelName },
        update: (store, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) {
            return;
          }

          const data = store.readQuery({ query: AllChannelsQuery });
          data.allChannels.push(channel);
          store.writeQuery({ query: AllChannelsQuery, data });
        },
      });

      const { ok, errors } = response.data.createChannel;
      if (ok) {
        onClose();
        resetForm();
        setSubmitting(false);
      } else {
        setErrors(normalizeErrors(errors));
        setSubmitting(false);
      }
    },
  }),
)(CreateChannelModal);
