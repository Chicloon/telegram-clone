import { PubSub, withFilter } from 'graphql-subscriptions';

import requireAuth, { requiresMemberAccess } from '../permissions';

const pubsub = new PubSub();

const NEW_DIRECT_MESSAGE = 'NEW_DIRECT_MESSAGE';

export default {
  DirectMessage: {
    // sender: requireAuth.createResolver((parent, args, { user, models }) =>
    //   models.User.findOne({ where: { id: user.id } })),
    title: async ({ senderId, receiverId }, args, { models }) => {
      const user = await models.User.findOne({ where: { id: 1 } });
      let title;
      if (user.id === senderId) {
        title = await models.User.findOne({ where: { id: receiverId } });
      } else {
        title = user;
      }
      return title;
    },
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
    // directMessages: requireAuth.createResolver(async (parent, args, { user, models }) =>
    direcMessagesList: async (parent, args, { models }) => {
      const user = await models.User.findOne({
        where: { id: 1 },
      });
      const result = await models.DirectMessage.findAll(
        {
          order: [['created_at', 'ASC']],
          where: {
            [models.sequelize.Op.or]: [{ receiverId: user.id }, { senderId: user.id }],
          },
        },
        { raw: true },
      );
      return result;
    },
  },
  Mutation: {
    createDirectMessage: async (parent, { receiverId }, { models, user }) => {
      try {
        console.log(receiverId);
        await models.DirectMessage.create({
          receiverId,
          senderId: 1,
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    //   createMessage: requireAuth.createResolver(async (parent, args, { models, user }) => {
    //     try {
    //       const directMessage = await models.DirectMessage.create({ ...args, senderId: user.id });
    //       pubsub.publish(NEW_DIRECT_MESSAGE, {
    //         senderId: user.id,
    //         receiverId: args.receiverId,
    //         newcreateDirectMessage: {
    //           ...directMessage.dataValues,
    //           sender: {
    //             username: user.username,
    //           },
    //         },
    //       });
    //       return true;
    //     } catch (err) {
    //       console.log(err);
    //       return false;
    //     }
    //   }),
  },
};
