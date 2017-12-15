import gql from 'graphql-tag';

export const MeQuerry = gql`
  {
    me {
      id
      username
      channels {
        id
        name
      }
    }
  }
`;

export const AllChannelsQuery = gql`
  {
    allChannels {
      id
      name
    }
  }
`;

export const UserChannelsQuery = gql`
  {
    userChannels {
      id
      name
    }
  }
`;

export const ChannelMessagesQuery = gql`
  query($channelId: Int!) {
    channelMessages(channelId: $channelId) {
      id
      text
      created_at
      user {
        id
        username
      }
    }
  }
`;

export const ChannelInfoQuery = gql`
  query($channelId: Int!) {
    channelInfo(channelId: $channelId) {
      id
      name
    }
  }
`;
