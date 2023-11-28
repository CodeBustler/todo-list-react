import React, { useState, useEffect } from "react";

function TodoList() {
	const [inputText, setInputText] = useState("");
	const [todoList, setTodoList] = useState(() => {
		// Initial value
		const storedTodoList = JSON.parse(localStorage.getItem("todoListDB"));
		return storedTodoList || [];
	});

	// Save data to local storage
	useEffect(() => {
		localStorage.setItem("todoListDB", JSON.stringify(todoList));
	}, [todoList]);

	//Adding tasks to list
	const addTask = () => {
		if (inputText === "") {
			alert("Enter some text!");
		} else {
			setTodoList((listData) => {
				const updatedList = [
					...listData,
					{ text: inputText, completed: false },
				];
				return updatedList;
			});
		}
		setInputText("");
	};

	// Deleting Particular Task
	const deleteTask = (e, index) => {
		if (e.target.tagName === "I") {
			const updatedList = todoList.filter((_, i) => i != index);
			setTodoList(updatedList);
		}
	};

	// Deleting All Particular Task
	const deleteAllTasks = () => {
		setTodoList([]);
	};

	// Completed  Task
	const completedTast = (e, index) => {
		if (e.target.tagName === "LI") {
			const updatedList = [...todoList];
			updatedList[index].completed = !updatedList[index].completed;
			setTodoList(updatedList);
		}
	};

	return (
		<div className="app-container">
			{/*Input*/}
			<h1>Todo-List For The Day! </h1>
			<div className="input-items">
				<input
					type="text"
					placeholder="Enter your task"
					value={inputText}
					onKeyPress={(e) => e.key === "Enter" && addTask()}
					onChange={(e) => setInputText(e.target.value)}
				/>
				<button onClick={addTask}>Add Task</button>
			</div>

			{/*Todos*/}
			<ul className="todoList-container">
				{todoList.length > 0 &&
					todoList.map((item, index) => (
						<li
							key={index}
							onClick={(e) => completedTast(e, index)}
							className={`${item.completed ? "completed" : ""}`}
						>
							{item.text}
							<i
								className="fa-solid fa-trash"
								onClick={(e) => deleteTask(e, index)}
							></i>
						</li>
					))}
			</ul>
			{todoList.length > 1 && (
				<span className="removeAll" onClick={deleteAllTasks}>
					Remove All tasks
					<i className="fa-solid fa-xmark"></i>
				</span>
			)}
		</div>
	);
}

export default TodoList;
