import { PubSub, withFilter } from 'graphql-subscriptions';

import requireAuth from '../permissions';

const pubsub = new PubSub();

const NEW_CHANNEL_MESSAGE = 'NEW_CHANNEL_MESSAGE';

export default {
  Subscription: {
    newChannelMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
        (payload, args) => payload.channelId === args.channelId,
      ),
    },
  },
  Query: {
    channelMessages: async (parent, { channelId }, { models }) => {
      const messages = await models.Message.findAll(
        { order: [['created_at', 'ASC']], where: { channelId } },
        { raw: true },
      );
      // console.log(messages);
      return messages;
    },
  },
  Message: {
    channel: ({ channelId }, args, { models }) =>
      models.Channel.findOne({ where: { id: channelId } }),
    user: ({ userId }, args, { models }) => models.User.findOne({ where: { id: userId } }),
  },
  Mutation: {
    createMessage: async (parent, args, { models, user }) => {
      console.log('-----------user ', user);
      try {
        const message = await models.Message.create({ ...args, userId: user.id });

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
    },
  },
};
