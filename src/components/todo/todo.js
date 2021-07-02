import React, { useEffect, useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from '../hooks/axiosHook';
import { Navbar } from 'react-bootstrap';
import { Container, Col, Row, Card, Pagination, Form } from 'react-bootstrap';
import { SettingContext } from '../context/setting';
import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

const ToDo = () => {

	const fetch = useAjax(todoAPI);
	const settingContext = useContext(SettingContext)
	// eslint-disable-next-line 
	useEffect(fetch, []);

	useEffect(() => {
		document.title =
			"To DO- complete: " +
			settingContext.items.filter((item) => !item.complete).length +
			"/" +
			"Incomplete: " +
			settingContext.items.filter((item) => item.complete).length;
	});

	return (
		<>
			<header>
				<Navbar className="CountBar" bg="dark" variant="dark" style={{ marginTop: '1rem', width: '51%', marginLeft: '24%' }} >
					<Navbar.Brand>
						To Do List Manger {settingContext.items.filter(item => !item.complete).length}
					</Navbar.Brand>
				</Navbar >
			</header>
			<Form
				style={{
					margin: '1rem auto 0', width: '500px', backgroundColor: 'rgb(52, 58, 64)',	padding: '1rem 1rem 0.2rem 2rem', borderRadius: '20px',	color: '#fff'
				}}>
				<div key={`inline-radio`} className="mb-3">
					<Form.Check
						inline
						label="completed To Do Item"
						name="sort"
						type="radio"
						id={`inline-radio-1`}
						onClick={() => {
							settingContext.setOffset(0);
							settingContext.setItems(settingContext.list.filter((item) => item.complete === true),
							);
						}}
					/>
					<Form.Check
						inline
						label="pending To Do Item"
						name="sort"
						type="radio"
						id={`inline-radio-3`}
						onClick={() => {
							settingContext.setOffset(0);
							settingContext.setItems(settingContext.list.filter(
								(item) => item.complete === false,
							),
							);
						}}
					/>
					<Form.Check
						inline label="difficulty" name="sort" type="radio" id={`inline-radio-2`} onClick={() => {
							settingContext.setOffset(0);
							let sorted = settingContext.list.sort((a, b) => a.difficulty - b.difficulty,); settingContext.setItems([...sorted]);
						}}
					/>
				</div>
			</Form>

			<Container fluid='md' style={{ marginTop: '1rem' }}>
				<Row className='justify-content-md-center'>
					<Card style={{ width: '18rem', height: '30%' }}>
						<Card.Body>
							<Card.Text>
								<Col><TodoForm handleSubmit={fetch} /></Col>
							</Card.Text>
						</Card.Body>
					</Card>

					<Col sm={4} md={{ span: 4, offset: 1 }}> <TodoList
						list={settingContext.items}
						handleComplete={fetch} handleDelete={fetch} />
						<Pagination style={{ marginTop: '15%', marginLeft: '40%' }}>
							<Pagination.Prev
								// disabled={!settingContext.disable}
								onClick={() => {
									let count = settingContext.page;
									if (count > 1) --count;

									let arr = [];

									for (
										let index = settingContext.offset;
										index < settingContext.itemsNum;
										index++
									) {
										arr.push(settingContext.items[index]);
									}

									let offset = settingContext.offset;
									if (offset >= 3) offset -= 3;
									if (settingContext.offset < 3) {
										settingContext.setDisable(false);
										offset = 0;
									}

									settingContext.setOffset(offset);
									settingContext.setPage(count);
								}}
							/>
							<Pagination.Next
								onClick={() => {
									let count = settingContext.page;
									let arr = [];
									if (
										Math.ceil(
											settingContext.items.length / settingContext.itemsNum,
										) > count
									) {
										++count;
									}

									for (
										let index = settingContext.offset;
										index < settingContext.itemsNum;
										index++
									) {
										arr.push(settingContext.items[index]);
									}

									let offset = settingContext.offset;

									if (offset < settingContext.items.length) {
										offset += 3;
										settingContext.setOffset(offset);
										settingContext.setPage(count);
									}

									if (offset > settingContext.items.length) {
										settingContext.setDisable(true);
										let rest = offset - settingContext.items.length;
										offset = offset - rest - 1;
										settingContext.setOffset(offset);
										settingContext.setPage(count);
									}
								}}
							/>
						</Pagination>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default ToDo;