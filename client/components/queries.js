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
      directMessages {
        id
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
  query($cursor: String, $channelId: Int!) {
    channelMessages(cursor: $cursor, channelId: $channelId) {
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

export const UsersDirectMessagesQuery = gql`
  {
    usersDirectMessages {
      id
      title {
        id
        username
      }
    }
  }
`;
