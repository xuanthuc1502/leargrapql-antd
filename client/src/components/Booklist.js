import React, { useState, useEffect } from "react"
import { Bookdetail } from "./Bookdetail";
import { Card } from 'antd'
import { Row, Col } from 'antd';

import { useQuery } from '@apollo/client'
import { getBooks } from '../graphql-client/queries'

const Booklist = () => {
	const [bookSelected, setBookselected] = useState(null)

	const {loading, error, data, refetch} = useQuery(getBooks)

	useEffect(()=>{},[])

	if (loading) return <p>Loading books ...</p>
	if (error) return <p>Error loading books!</p>
	return (
		<Row>
			<Col span={12}>
				<Row>
					{data.books.map(book => (
						<Col span={8} key={book.id}>
							<Card 
							  style={{ margin: '10px' }}  
							  bordered={false}
							  onClick={()=>setBookselected(book.id)}>
								{book.name}
							</Card>
						</Col>
					))}
				</Row>
			</Col>
			<Col span={12} style={{ margin: '10px 0 0 0' }}><Bookdetail bookId = {bookSelected}></Bookdetail></Col>
		</Row>
	)
}
export default Booklist
