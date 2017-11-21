import { PubSub, withFilter } from 'graphql-subscriptions';

import requireAuth, { requiresMemberAccess } from '../permissions';

const pubsub = new PubSub();

const NEW_DIRECT_MESSAGE = 'NEW_DIRECT_MESSAGE';

export default {
  DirectMessage: {
    sender: requireAuth.createResolver((parent, args, { user, models }) =>
      models.User.findOne({ where: { id: user.id } })),
  },
  Subscription: {
    newcreateDirectMessage: {
      subscribe: requireAuth.createResolver(withFilter(
        () => pubsub.asyncIterator(NEW_DIRECT_MESSAGE),
        (payload, args, { user }) =>
          (payload.senderId === user.id && payload.receiverId === args.receiverId) ||
            (payload.senderId === args.receiverId && payload.receiverId === user.id),
      )),
    },
  },
  Query: {
    directMessage: requireAuth.createResolver(async (parent, { receiverId }, { user, models }) =>
      models.DirectMessage.findAll(
        {
          order: [['created_at', 'ASC']],
          where: {
            [models.sequelize.Op.or]: [
              {
                [models.sequelize.Op.and]: [{ senderId: user.id }, { receiverId }],
              },
              {
                [models.squelize.Op.and]: [{ senderId: recieverId }, { recieverId: user.id }],
              },
            ],
          },
        },
        { raw: true },
      )),
  },
  Mutation: {
    createMessage: requireAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const directMessage = await models.DirectMessage.create({ ...args, senderId: user.id });

        pubsub.publish(NEW_DIRECT_MESSAGE, {
          senderId: user.id,
          receiverId: args.receiverId,
          newcreateDirectMessage: {
            ...directMessage.dataValues,
            sender: {
              username: user.username,
            },
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
};
