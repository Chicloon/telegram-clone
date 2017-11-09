import gql from 'graphql-tag';

export const AllChannelsQuery = gql`
  {
    allChannels {
      id
      name
    }
  }
`;
