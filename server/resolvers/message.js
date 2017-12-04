import { PubSub, withFilter } from 'graphql-subscriptions';

import requireAuth, { requiresMemberAccess } from '../permissions';

const pubsub = new PubSub();

const NEW_CHANNEL_MESSAGE = 'NEW_CHANNEL_MESSAGE';

export default {
  Subscription: {
    newChannelMessage: {
      subscribe: requiresMemberAccess.createResolver(withFilter(
        () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
        (payload, args) => payload.channelId === args.channelId,
      )),
    },
  },
  Query: {
    channelMessages: requireAuth.createResolver(async (parent, { channelId }, { models }) => {
      const messages = await models.Message.findAll(
        { order: [['created_at', 'ASC']], where: { channelId } },
        { raw: true },
      );
      // console.log(messages);
      return messages;
    }),
    directMessages: requireAuth.createResolver(async (parent, { directMessageId }, { models }) => {
      const directMessages = await models.Message.findAll(
        { order: [['created_at', 'ASC']], where: { directMessageId } },
        { raw: true },
      );
      // console.log(directMessages);
      return directMessages;
    }),
  },
  Message: {
    channel: ({ channelId }, args, { models }) =>
      models.Channel.findOne({ where: { id: channelId } }),
    user: ({ userId }, args, { models }) => models.User.findOne({ where: { id: userId } }),
    directMessage: ({ directMessageId }, args, { models }) =>
      models.DirectMessage.findOne({ where: { id: directMessageId } }),
  },
  Mutation: {
    createMessage: requireAuth.createResolver(async (parent, args, { models, user }) => {
      // createMessage: async (parent, args, { models, user }) => {
      try {
        // const message = await models.Message.create({ ...args, userId: user.id });
        const message = await models.Message.create({ ...args, userId: user.id });
        // if (args.channelId) {
        //   console.log('================== channelId', args.channelId, args.directMessageId);
        // }

        const asyncFunc = async () => {
          const currentUser = await models.User.findOne({
            where: {
              id: user.id,
            },
          });

          pubsub.publish(NEW_CHANNEL_MESSAGE, {
            channelId: args.channelId,
            newChannelMessage: {
              ...message.dataValues,
              user: currentUser.dataValues,
            },
          });
        };

        asyncFunc();

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
};
