import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './todo.css';
import { TodoAdd } from './TodoAdd';
import { TodoList } from './TodoList';
import { useTodo } from './useTodo';

function Todo() {
	const {
		todos,
		todosCount,
		pendingTodosCount,
		handleNewTodo,
		handleDeleteTodo,
		handleCompleteTodo,
		handleUpdateTodo,
	} = useTodo();

	return (
		<>
			<div className='card-to-do'>
				<header>
					<legend><h1>Tareas</h1></legend>
					<nav>
						<Link to="/">Salir</Link>
					</nav>
				</header>
				<div className='counter-todos'>
					<h3>
						N° Tareas: <span>{todosCount}</span>
					</h3>
					<h3>
						Pendientes: <span>{pendingTodosCount}</span>
					</h3>
				</div>

				<div className='add-todo'>
					<h3>Agregar Tarea</h3>
					<TodoAdd handleNewTodo={handleNewTodo} />
				</div>

				<TodoList
					todos={todos}
					handleUpdateTodo={handleUpdateTodo}
					handleDeleteTodo={handleDeleteTodo}
					handleCompleteTodo={handleCompleteTodo}
				/>
			</div>
		</>
	);
}

export default Todo;
