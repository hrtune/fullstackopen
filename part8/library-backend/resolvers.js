const { AuthenticationError, UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

require("dotenv").config();

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const PASSWORD = "secret";

const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author });
      const genre = args.genre;
      if (author && genre) {
        return Book.find({ author, genres: { $in: genre } }).populate("author");
      } else if (author) {
        return Book.find({ author }).populate("author");
      } else if (args.genre) {
        return Book.find({ genres: { $in: genre } }).populate("author");
      }
      return Book.find({}).populate("author");
    },
    allAuthors: async (root, args) => Author.find({}),
    allGenres: async (root, args) => {
      const arraysOfGenres = await Book.collection.distinct("genres");
      const genreSet = new Set(
        arraysOfGenres.reduce((arr, g) => arr.concat(g), [])
      );
      return Array.from(genreSet);
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const author = await Author.findOne({ name: args.author });

      if (!author) {
        const newAuthor = new Author({ name: args.author });
        try {
          await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: { author: args.author },
          });
        }
        const newBook = new Book({ ...args, author: newAuthor });
        try {
          await newBook.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: { ...args },
          });
        }

        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

        return newBook;
      }

      const newBook = new Book({ ...args, author: author });
      try {
        await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { ...args },
        });
      }
      return newBook;
    },

    editAuthor: async (root, { name, setBornTo }, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      try {
        return await Author.findOneAndUpdate(
          { name },
          { born: setBornTo },
          { new: true }
        );
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { name, setBornTo },
        });
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { ...args },
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== PASSWORD) {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },

  Author: {
    bookCount: async (root) => {
      try {
        const books = await Book.find({ author: root });
        return books.length;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { ...args },
        });
      }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
