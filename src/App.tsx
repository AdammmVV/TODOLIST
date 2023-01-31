import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TodolistState = {
    [todoListId: string]: TaskType[]
}

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TodolistState>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "WHISKEY", isDone: true},
            {id: v1(), title: "COLA", isDone: true},
            {id: v1(), title: "ACE", isDone: false},
        ],
    })


    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoListId))
    }

    function removeTask(id: string, todoListId: string) {
        const updatedTasks = tasks[todoListId].filter(t => t.id !== id);
        const copy = tasks[todoListId] = updatedTasks
        setTasks({...tasks, copy});
    }

    function addTask(title: string, todoListId: string) {
        const task = {id: v1(), title: title, isDone: false}
        const updatedTasks = {...tasks, [todoListId]: [task, ...tasks[todoListId]]}
        setTasks(updatedTasks);
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let updatedTasks = tasks[todoListId].map(task => task.id === taskId ? {...task, isDone: isDone} : task);
        setTasks({...tasks, [todoListId]: updatedTasks});
    }


    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        const updateTodolist = todoLists.map(td => td.id === todoListId ? {...td, filter: filter} : td)
        setTodoLists(updateTodolist)
    }
    const filteredTasks = (filter: FilterValuesType, tasks: TaskType[]): TaskType[] => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }

    }

    const mapTodoList = todoLists.length ? todoLists.map(tl => {
        const changeFilter = filteredTasks(tl.filter, tasks[tl.id])
        return (
            <Todolist key={tl.id}
                      title={tl.title}
                      tasks={changeFilter}
                      removeTask={removeTask}
                      removeTodoList={removeTodoList}
                      changeFilter={changeTodoListFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={tl.filter}
                      todoListId={tl.id}
            />
        )
    }) : <div>Create yore first TODOLIST</div>

    return (
        <div className="App">
            {mapTodoList}
        </div>
    );
}

export default App;
