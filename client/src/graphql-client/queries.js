import {gql} from '@apollo/client'

const getBooks = gql`
query MyBooks {
	books {
	  id
	  name
	}
      }
`

const getBookById = gql`
query myBook ($id: ID!){
	book(id:$id) {
	  id
	  name
	  genre
	  author{
	    id
	    name
	    age
	    books {
		    id
		    name
	    }
	  }
	}
      }
`

const getAuthors = gql`
query MyAuthors {
	authors {
	  id
	  name
	}
      }
`

const createBook = gql`
mutation CreateBook($name:String, $genre: String, $authorId: ID!){
	createBook(name:$name, genre:$genre, authorId:$authorId) {
	  id
	  name
	  author {
	    id
	    name
	  }
	}
      }
`
const createAuthor = gql`
mutation CreateAuthor ($name: String, $age: Int){
	createAuthor(name: $name, age:$age) {
	  id
	  name
	}
      }
`

export { getBooks, getBookById, getAuthors, createBook, createAuthor}