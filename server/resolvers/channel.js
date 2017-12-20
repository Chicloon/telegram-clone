import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
  Query: {
    allChannels: (parent, args, { models }) => models.Channel.findAll(),
    userChannels: requiresAuth.createResolver(async (parent, args, { user, models }) => {
      // userChannels: async (parent, args, { user, models }) => {
      const channels = await models.sequelize.query(
        `select *
        from channels join members on channels.id = members.channel_id
        where user_id=?`,
        {
          replacements: [user.id],
          model: models.Channel,
          raw: true,
        },
      );
      return channels;
    }),
    channelInfo: requiresAuth.createResolver((parent, { channelId }, { models }) =>
      models.Channel.findOne({ where: { id: channelId } })),
  },
  Mutation: {
    createChannel: requiresAuth.createResolver(async (parent, args, { models, user }) => {
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
    addChannelMember: requiresAuth.createResolver(async (parent, { channelId }, { models, user }) => {
      try {
        const response = await models.sequelize.transaction(async () => {
          const member = await models.Member.findOne({ where: { userId: user.id, channelId } });
          const channel = await models.Channel.findOne({ where: { id: channelId } });
          if (!member) {
            console.log('adding user to channel members');
            models.Member.create({ userId: user.id, channelId, role: 1 });
          } else {
            console.log('user already channel member');
            return {
              ok: false,
              channel,
            };
          }
          return {
            ok: true,
            channel,
          };
        });
        return response;
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    }),
  },
};
