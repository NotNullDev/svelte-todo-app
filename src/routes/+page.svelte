<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { todoStore } from '../stores/todos';
	let currentTodoVal = '';
</script>

<div class="h-full w-full flex flex-col items-center pt-15 gap-6 mt-10">
	<form>
		<input type="text" bind:value={currentTodoVal} class="input " />
		<button
			type="submit"
			class="btn btn-primary"
			on:click={(e) => {
				e.preventDefault();
				todoStore.addTodo({
					content: currentTodoVal,
					done: false
				});
				currentTodoVal = '';
			}}>Add Todo</button
		>
	</form>
	<div class="flex flex-col p-4 gap-3">
		{#each $todoStore as todo (todo.id || todo.content)}
			<div class="flex flex-row items-center gap-4" in:fade out:fly={{ x: -500 }}>
				<input
					id="input-{todo.id}"
					type="checkbox"
					bind:checked={todo.done}
					class="checkbox"
					on:click={() => {
						todoStore.toggleTodo(todo.id ?? 0);
					}}
				/>
				<label for="input-{todo.id}" class={todo.done ? 'line-through' : ''}>{todo.content}</label>
				<button
					class="btn btn-square btn-sm btn-ghost"
					on:click={() => {
						todoStore.removeTodo(todo.id ?? 0);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
						/>
					</svg>
				</button>
			</div>
		{/each}
	</div>
</div>
