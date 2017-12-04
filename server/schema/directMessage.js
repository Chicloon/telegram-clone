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
  direcMessagesList: [DirectMessage!]!
}

type Mutation {  
  createDirectMessage(receiverId: Int!): Boolean!
}

type Subscription {
  newcreateDirectMessage(receiverId: Int!): DirectMessage!
}

`;
