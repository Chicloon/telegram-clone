export default `

  type User {
    id: Int!
    username: String!
    email: String!   
    channels: [Channel!]!
    directMessages: [DirectMessage]
  }

  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
    me: User!
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }

`;
