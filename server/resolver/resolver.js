// const Author = require('../models/Author')
// const Book = require('../models/Book')

const resolvers = {
	//QUERY
	Query: {
		books: async (parent, args, context) => await context.mongoDataMethods.getAllBooks(),
		book: async (parent, args, context) => await context.mongoDataMethods.getBookById(args.id),
		authors: async (parent, args, context) => await context.mongoDataMethods.getAllAuthors(),
		author: async (parent, args, context) => await context.mongoDataMethods.getAuthorById(args.id)
	},
	Book: {
		// author: (parent,args, context) => authors.find(author => author.id == parent.authorId)
		author: async (parent,args, context) => await context.mongoDataMethods.getAuthorById(parent.authorId)
	},
	Author: {
		// books: (parent, args) => books.filter(book => book.authorId === parent.id)
		books: async (parent, args, context) => await context.mongoDataMethods.getAllBooks({authorId: parent.id})
	},

	//MUTATION
	Mutation: {
		createAuthor: async (parent, args, context) => await context.mongoDataMethods.createAuthor(args),
		createBook: async (parent, args, context) => await context.mongoDataMethods.createBook(args)
	}
}

module.exports = resolvers 