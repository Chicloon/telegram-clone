export default `
  type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel!
    created_at: String
  }

  type Query {
    channelMessages(channelId: Int!): [Message!]!
  }

  type Mutation {
    createMessage(channelId: Int!, text: String!): Boolean!
  }

  type Subscription {
    newChannelMessage(channelId: Int!): Message!
  }

`;
