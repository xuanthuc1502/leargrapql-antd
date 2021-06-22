const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose')

//load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

// load db methods
const mongoDataMethods = require('./data/db')


// Connect to MonggoDB
const connectDB = async () => {
	try {
		await mongoose.connect('mongodb+srv://thucnx:123456Thuc@learngraphql.yiom9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})
		console.log('MongoDB conneted');
	} catch (error) {
		console.log(error.message);
		process.exit(1)
	}
}

connectDB()

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({mongoDataMethods})
})

const app = express()
server.applyMiddleware({ app })

app.listen({port:4000}, () => console.log('Server running ...'))