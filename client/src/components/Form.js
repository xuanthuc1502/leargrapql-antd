import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Row, Col, InputNumber } from 'antd';

import { useQuery, useMutation } from '@apollo/client';
import { createBook, createAuthor, getAuthors } from '../graphql-client/queries';

const { Option } = Select;

const layout = {
	labelCol: {span: 4},
	wrapperCol: {span: 20}
}
const tailLayout = {
	wrapperCol: { offset:4, span:20 }
}

export const Forms = () => {
	const [form] = Form.useForm();

	//Graphql operation
	const [addbook, dataMutation] = useMutation(createBook)
	const [addauthor, dataMutation_auth] = useMutation(createAuthor)
	const {loading, error, data} = useQuery(getAuthors)

	const submitAddBook = (values) =>{
		console.log('click submit form', values);
		try {addbook({
			variables:values
		})} catch (error) {console.log('error mutation: ',error);}
		
		// console.log('error mutation: ',mutationError);
		console.log('dataMutation ',dataMutation);
	}

	const submitAddAuthor = (values) =>{
		console.log('click submit author', values);
		try {addauthor({
			variables:values
		})} catch (error) {console.log('error mutation: ',error);}
		
		// console.log('error mutation: ',mutationError);
		console.log('dataMutation ',dataMutation_auth);
	}

	if (loading) return <p>Loading books ...</p>
	if (error) return <p>Error loading books!</p>
	// console.log(dataMutation);
	return (
		<Row>
			<Col span={12} style={{ padding: '10px' }}>
			<Form 
			{...layout}
			name="addbook"
			initialValues={{ remember: true }}
			onFinish={submitAddBook}
			onFinishFailed={() => console.log('failed')}
			>
				<Form.Item
				label="Book Name"
				name="name"
				rules={[{ required: true, message: 'Please input your book name!' }]}
				>
					<Input/>
				</Form.Item>

				<Form.Item
				label="Book Genre"
				name="genre"
				rules={[{ required: true, message: "Please input book genre" }]}
				>
					<Input/>
				</Form.Item>

				<Form.Item 
				label="Author"
				name="authorId" 
				rules={[{ required :true }]}
				>
					{loading || error ?(<div>Loading author ...</div>):(
					<Select placeholder= "Select Author above">
						{data.authors.map(author => (
							<Option value={author.id} key={author.id}>{author.name}</Option>
						))}
					</Select>)}
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">Add Book</Button>
				</Form.Item>
			</Form>
			</Col>
			<Col span={12} style={{ padding: '10px' }}>
			<Form {...layout}
			name="addauthor"
			initialValues={{ remember: true }}
			onFinish={submitAddAuthor}
			onFinishFailed={()=>{}}
			>
				<Form.Item></Form.Item>
				<Form.Item
				label="Author Name"
				name="name"
				rules={[{ required: true, message: 'Please input your author name!' }]}
				>
				<Input />
				</Form.Item>

				<Form.Item
				label="Author age"
				name="age"
				rules={[{ required: true, message: "Please input author age" }]}
				>
					<InputNumber/>
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">Add Author</Button>
				</Form.Item>
				</Form>
			</Col>
		</Row>
	)
}
