import formatErrors from '../formatErrors';

export default {
  Mutation: {
    createMessage: async (parent, args, { models }) => {
      console.log(parent, args);
      try {
        const message = await models.Message.create(args);
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
