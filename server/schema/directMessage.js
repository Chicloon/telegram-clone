export default `
type DirectMessage {
  id: Int!
  title: User!
  messages: [Message!]
  senderId: Int!
  receiverId: Int!
  created_at: Date!
}

type Query {
  usersDirectMessages: [DirectMessage!]!
  #directMessage(directMessageId: Int!): [DirectMessage!]!
}

type Mutation {  
  createDirectMessage(receiverId: Int!): Int!
}

type Subscription {
  newcreateDirectMessage: DirectMessage!
}

`;
