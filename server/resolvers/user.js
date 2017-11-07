import { tryLogin, createTokens } from '../auth';
import formatErrors from '../formatErrors';

export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, args, { models, SECRET, SECRET2 }) => {
      try {
        const user = await models.User.create(args);
        const [token, refreshToken] = await createTokens(user, SECRET, SECRET2);
        console.log('----tokens', token, refreshToken);
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
