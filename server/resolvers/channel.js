import formatErrors from '../formatErrors';
import requireAuth from '../permissions';

export default {
  Query: {
    allChannels: (parent, args, { models }) => models.Channel.findAll(),
    channelInfo: (parent, { channelId }, { models }) =>
      models.Channel.findOne({ where: { id: channelId } }),
  },
  Mutation: {
    createChannel: requireAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const response = await models.sequelize.transaction(async () => {
          const channel = await models.Channel.create(args);
          await models.Member.create({ userId: user.id, channelId: channel.id, role: 10 });
          return channel;
        });
        return {
          ok: true,
          channel: response,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    }),
    addChannelMember: requireAuth.createResolver(async (parent, { channelId }, { models, user }) => {
      try {
        const member = await models.Member.findOne({ where: { userId: user.id, channelId } });
        if (!member) {
          console.log('adding user to channel members');
          models.Member.create({ userId: user.id, channelId, role: 1 });
        } else {
          console.log('user already channel member');
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
};
