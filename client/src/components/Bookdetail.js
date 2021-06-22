import React from 'react'
import {Card} from 'antd'
import { useQuery } from '@apollo/client'
import { getBookById } from '../graphql-client/queries'

export const Bookdetail = ({bookId}) => {
	console.log('print book: ',bookId); // why use bookId.book.Id
	const {loading, error, data} = useQuery(getBookById, {variables: {id:bookId}, skip:!bookId})

	if (loading) return <p>Loading books detail ...</p>
	if (bookId !== null & error) return <p>Error loading books detail!</p>

	const book = !loading && !error && data? data.book:null	
	return (
		<div>
		{book === null? (<p>Please select Book</p>): (
			<div>
				<Card title={book.name}>
				<p>Genre: {book.genre}</p>
				<p>Author: {book.author.name}</p>
				<p>Age: {book.author.age}</p>
				<p>All Books by {book.author.name}:</p>
				<ul>
					{book.author.books.map(book => (
						<li key={book.id}>{book.name}</li>
					))}
				</ul>
				</Card>
			</div>
		)}
		</div>
	)
}
