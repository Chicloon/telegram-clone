import { tryLogin, createTokens } from '../auth';
import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
  User: {
    channels: requiresAuth.createResolver(async (parent, args, { user, models }) => {
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
    directMessages: requiresAuth.createResolver(async (parent, args, { user, models }) => {
      try {
        const directMessages = await models.DirectMessage.findAll(
          {
            order: [['created_at', 'ASC']],
            where: {
              [models.sequelize.Op.or]: [{ receiverId: user.id }, { senderId: user.id }],
            },
          },
          { raw: true },
        );
        console.log(directMessages);
        if (directMessages.length > 0) {
          return true;
        }
        return false;
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  },
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
    me: requiresAuth.createResolver((parent, args, { models, user }) =>
      models.User.findOne({ where: { id: user.id } })),
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, args, { models, SECRET, SECRET2 }) => {
      try {
        const user = await models.User.create(args);
        const [token, refreshToken] = await createTokens(user, SECRET, SECRET2);
        // console.log('----tokens', token, refreshToken);
        return {
          ok: true,
          user,
          token,
          refreshToken,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
