export default `
  type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel
    directMessage: DirectMessage
    created_at: Date
  }

  type Query {
    channelMessages(channelId: Int!, cursor: String): [Message!]!
    directMessages(directMessageId: Int!): [Message!]!
  }

  type Mutation {
    createMessage(channelId: Int, directMessageId: Int, text: String!): Boolean!
  }

  type Subscription {
    newChannelMessage(channelId: Int!): Message!
  }

`;
