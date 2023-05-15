import express from 'express';
import zod from "zod";

const app = express();

app.use(express.json());

const newTodoSchema = zod.object({
	text: zod.string(),
	deadline: zod.string(),
});

type NewTodo = zod.infer<typeof newTodoSchema>;

interface Todo {
	id: number;
	text: string;
	deadline: Date;
}

const todos: Todo[] = [];

todos.push({
	id: 1,
	text: 'Learn TypeScript',
	deadline: new Date(),
});

app.get('/todos', (_, res) => {
	res.json(todos);
});

app.post('/todos', (req, res) => {
	try {
		const parsedNewTodo = newTodoSchema.parse(req.body);

		console.log(parsedNewTodo.deadline);

		const newTodo = {
			id: todos.length + 1,
			text: parsedNewTodo.text,
			deadline: new Date(parsedNewTodo.deadline),
		};

		console.log(newTodo);

		todos.push(newTodo);

		res.status(201).json(newTodo);
	} catch (error) {
		res.status(400).json(error);
	}
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
