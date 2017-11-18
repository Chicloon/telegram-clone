export default `

  type Channel {
    id: Int!
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [User!]!
    created_at: String
  }

  type ChannelResponse {
    ok: Boolean!
    channel: Channel
    errors: [Error!]
  }

  type Query {
    allChannels: [Channel!]! 
    channelInfo(channelId: Int!): Channel!
  }

  type Mutation {
    createChannel(name: String!, public: Boolean=false): ChannelResponse!
  }
`;
