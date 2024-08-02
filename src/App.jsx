import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
	const [todo, settodo] = useState('');
	const [todoholdingarray, settodos] = useState([]);

	useEffect(() => {
		let todoString = localStorage.getItem('todoholdingarray');
		if (todoString) {
			let todoholdingarray = JSON.parse(
				localStorage.getItem('todoholdingarray')
			);
			settodos(todoholdingarray);
		}
	}, []);

	const savetoLS = (params) => {
		localStorage.setItem('todoholdingarray', JSON.stringify(todoholdingarray));
	};
	const handleedit = (e, id) => {
		let t = todoholdingarray.filter((i) => i.id === id);
		settodo(t[0].todo);
		let newtodos = todoholdingarray.filter((item) => {
			return item.id !== id;
		});
		settodos(newtodos);
		savetoLS();
	};
	const handledelete = (e, id) => {
		let newtodos = todoholdingarray.filter((item) => {
			return item.id !== id;
		});
		settodos(newtodos);
		savetoLS();
	};

	const handleadd = () => {
		settodos([...todoholdingarray, { id: uuidv4(), todo, isCompleted: false }]);
		settodo('');
		savetoLS();
	};

	const handlechange = (e) => {
		settodo(e.target.value);
	};

	const handlecheckbox = (e) => {
		let id = e.target.name;
		let index = todoholdingarray.findIndex((item) => {
			return item.id === id;
		});
		let newtodos = [...todoholdingarray];
		newtodos[index].isCompleted = !newtodos[index].isCompleted;
		settodos(newtodos);
	};

	return (
		<>
			<Navbar />
			<div className="container my-5 rounded-xl mx-auto p-5 bg-violet-100 min-h-[80vh]">
				<div className="addtodo my-5">
					<h2 className="text-lg font-bold ">Add a todo </h2>

					<input
						onChange={handlechange}
						value={todo}
						type="text"
						placeholder="Enter your task"
						className="w-1/6"
					/>

					<button
						onClick={handleadd}
						className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-6">
						ADD
					</button>
				</div>

				<h2 className="text-lg font-bold">Your To Do List </h2>

				<div className="todos">
					{todoholdingarray.length == 0 && (
						<div className="m-3">No todos to display </div>
					)}
					{todoholdingarray.map((item) => {
						return (
							<div
								key={item.id}
								className="todo flex justify-between w-1/2 my-6">
								<input
									name={item.id}
									onChange={handlecheckbox}
									type="checkbox"
									value={item.isCompleted}
								/>
								<div className={item.isCompleted ? 'line-through' : ''}>
									{item.todo}
								</div>
								<div className="buttons flex h-full">
									<button
										onClick={(e) => handleedit(e, item.id)}
										className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1">
										Edit
									</button>
									<button
										onClick={(e) => {
											handledelete(e, item.id);
										}}
										className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1">
										Delete
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default App;
