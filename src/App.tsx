import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListsType = {
    id: string
    title: string
}

type TasksStateType = {
    [key: string]: {
        data: TaskType[]
        filter: FilterValuesType
    }
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS1111", isDone: true},
                {id: v1(), title: "JS1111", isDone: false}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "HTML&CSS22222", isDone: true},
                {id: v1(), title: "JS2222", isDone: true}
            ],
            filter: "all"
        }
    });


    const removeTodolist = (todolistId: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }

    function removeTask(todolistId: string, taskId: string) {
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: tasks[todolistId].data.filter(el => el.id !== taskId)}})
    }

    function addTask(todolistId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: {...tasks[todolistId], data: [newTask, ...tasks[todolistId].data]}})
    }

    function changeStatus(todolistId: string, taskId: string, newIsDone: boolean) {
        setTasks({...tasks, [todolistId]:{...tasks[todolistId], data: tasks[todolistId].data.map(task => task.id === taskId ? {...task, isDone: newIsDone} : task)}})
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTasks({...tasks, [todolistId]:{...tasks[todolistId], filter: value}})
    }

    const mapTodoList = todoLists.length ? todoLists.map((el) => {
        let tasksForTodolist = tasks[el.id].data;
        if (tasks[el.id].filter === "active") {
            tasksForTodolist = tasks[el.id].data.filter(t => !t.isDone);
        }
        if (tasks[el.id].filter === "completed") {
            tasksForTodolist = tasks[el.id].data.filter(t => t.isDone);
        }
        return (
            <Todolist
                key={el.id}
                todolistId={el.id}
                title={el.title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={tasks[el.id].filter}
                removeTodolist={removeTodolist}
            />
        )
    }) :
        <div>Create your first Todo</div>

    return (
        <div className="App">
            {mapTodoList}
        </div>
    );
}

export default App;
