import { writable } from 'svelte/store';

export type TodoType = {
	id?: number;
	content: string;
	done: boolean;
};

function createTodoStore() {
	const { set, subscribe, update } = writable<TodoType[]>([]);
	let nextFreeId = 0;

	const addTodo = (todo: TodoType) => {
		if (todo.content.trim() === '') {
			return;
		}
		update((old) => {
			old.push({
				...todo,
				id: nextFreeId++
			});
			return old;
		});
		return todo;
	};

	const removeTodo = (todoId: number) => {
		update((old) => {
			old = old.filter((todo) => todo.id !== todoId);
			return old;
		});
	};

	const toggleTodo = (todoId: number) => {
		update((old) => {
			const todo = old.find((t) => t.id === todoId);
			if (!todo) return old;

			todo.done = !todo.done;
			return old;
		});
	};

	return {
		addTodo,
		removeTodo,
		toggleTodo,
		subscribe
	};
}

export const todoStore = createTodoStore();
