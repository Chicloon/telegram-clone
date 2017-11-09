export default `
  type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel!
    created_at: Date
  }

  type MessageResponse {
    ok: Boolean!
    message: Message
    errors: [Error!]
  }

  type Query {
    chanelMessages(channelId: Int!): [Message!]!
  }

  type Mutation {
    createMessage(channelId: Int!, text: String!): MessageResponse!
  }

`;
