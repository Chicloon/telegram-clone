import { PubSub, withFilter } from 'graphql-subscriptions';

import requireAuth, { requiresMemberAccess } from '../permissions';

const pubsub = new PubSub();

const NEW_DIRECT_MESSAGE = 'NEW_DIRECT_MESSAGE';

export default {
  DirectMessage: {
    title: requireAuth.createResolver(async ({ senderId, receiverId }, args, { models, user }) => {
      let title;
      if (user.id === senderId) {
        title = await models.User.findOne({ where: { id: receiverId } });
      } else {
        title = user;
      }
      return title;
    }),
    messages: requireAuth.createResolver(async ({ id }, args, { models }) =>
      models.Message.findAll({ where: { directmessage_id: id } })),
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
    usersDirectMessages: requireAuth.createResolver(async (parent, args, { user, models }) =>
      models.DirectMessage.findAll(
        {
          order: [['created_at', 'ASC']],
          where: {
            [models.sequelize.Op.or]: [{ receiverId: user.id }, { senderId: user.id }],
          },
        },
        { raw: true },
      )),
  },
  Mutation: {
    createDirectMessage: async (parent, { receiverId }, { models, user }) => {
      try {
        const directMessage = await models.DirectMessage.create({
          receiverId,
          senderId: user.id,
        });
        pubsub.publish(NEW_DIRECT_MESSAGE, {
          senderId: user.id,
          receiverId,
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
    },
    // createMessage: requireAuth.createResolver(async (parent, { receiverId }, { models, user }) => {
    //   try {
    //     const directMessage = await models.DirectMessage.create({ receiverId, senderId: user.id });
    //     pubsub.publish(NEW_DIRECT_MESSAGE, {
    //       senderId: user.id,
    //       receiverId,
    //       newcreateDirectMessage: {
    //         ...directMessage.dataValues,
    //         sender: {
    //           username: user.username,
    //         },
    //       },
    //     });
    //     return true;
    //   } catch (err) {
    //     console.log(err);
    //     return false;
    //   }
    // }),
  },
};
