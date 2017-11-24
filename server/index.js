import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import models from './models';
import { refreshTokens } from './auth';

const PORT = 4000;
const SECRET = 'asiodfhoi1hoi23jnl1kejd';
const SECRET2 = 'asiodfhoi1hoi23jnl1kejasdjlkfasdd';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use(cors('*'));

let currentUser;
const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  // console.log('============= token', token);
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      currentUser = user;
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      currentUser = newTokens.user;
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);

const graphqlEndpoint = '/graphql';

app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      user: req.user,
      SECRET,
      SECRET2,
    },
  })),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: graphqlEndpoint,
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
  }),
);

const server = createServer(app);

models.sequelize.sync({}).then(() => {
  server.listen(PORT, () => {
    // eslint-disable-next-line no-new
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: async ({ token, refreshToken }, webSocket) => {
          if (token && refreshToken) {
            try {
              const { user } = jwt.verify(token, SECRET);
              models.User.findOne({ where: { id: user.id } }).then((res) => {
                res.set({ online: true });
                res.save().then((result) => {
                  console.log('-------------user online', user);
                });
              });
              return { models, user };
            } catch (err) {
              const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);

              return { models, user: newTokens.user };
            }
          }

          return { models };
        },
        onDisconnect: (webSocket) => {
          console.log('current User is ------', currentUser);
          currentUser &&
            models.User.findOne({ where: { id: currentUser.id } }).then((res) => {
              res.set({ online: false });
              res.save().then((result) => {
                console.log('-------------user offline', currentUser);
              });
            });
        },
      },
      {
        server,
        path: '/subscriptions',
      },
    );
  });
});

console.log(`server running on port ${PORT}`);
