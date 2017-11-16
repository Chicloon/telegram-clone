import formatErrors from '../formatErrors';
import requireAuth from '../permissions';

export default {
  Query: {
    channelMessages: async (parent, { channelId }, { models }) => {
      const messages = await models.Message.findAll(
        { order: [['created_at', 'ASC']], where: { channelId } },
        { raw: true },
      );
      console.log(messages);
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
      console.log(parent, args);
      try {
        // const message = await models.Message.create({ userId: user.id, ...args });
        const message = await models.Message.create({ ...args, userId: 1 });
        console.log(message);
        return {
          ok: true,
          message,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          error: formatErrors(err, models),
        };
      }
    },
  },
};
