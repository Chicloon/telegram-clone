export default `
type DirectMessage {
  id: Int!
  text: String!
  sender: User!
  receiverId: Int!
  created_at: Date!
}

type Query {
  directMessage(receiverId: Int!): [DirectMessage!]!
}

type Mutation {
  createDirectMessage(receiverId: Int!, text: String!): Boolean!
}

type Subscription {
  newcreateDirectMessage(receiverId: Int!): DirectMessage!
}

`;
