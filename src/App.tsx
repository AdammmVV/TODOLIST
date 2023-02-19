import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodoListAC,
    changeFilterAC,
    changeTodoListTitleAC,
    removeTodolistAC,
    todoListReducer
} from "./reducer/todoListReducer";
import {
    addNewTasksAC,
    addTaskAC,
    changeStatusTaskAC,
    changeTaskTitleAC,
    deleteTasksAC,
    removeTaskAC,
    tasksReducer
} from "./reducer/tasksReducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todoLists, todoListsDispatch] = useReducer(todoListReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    const addTodoList = (newTitle: string) => {
        const newId = v1()
        todoListsDispatch(addTodoListAC(newTitle, newId))
        tasksDispatch(addNewTasksAC(newId))
    }

    function removeTask(id: string, todolistId: string) {
        tasksDispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        tasksDispatch(addTaskAC(title, todolistId))
    }

    function changeStatusTask(id: string, isDone: boolean, todolistId: string) {
        tasksDispatch(changeStatusTaskAC(id, isDone, todolistId))
    }

    const changeTaskTitle = (id: string, title: string, todolistId: string) => {
        tasksDispatch(changeTaskTitleAC(id, title, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        todoListsDispatch(changeFilterAC(value, todolistId))
    }

    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        todoListsDispatch(changeTodoListTitleAC(todoListId, newTitle))
    }

    function removeTodolist(id: string) {
        todoListsDispatch(removeTodolistAC(id))
        tasksDispatch(deleteTasksAC(id))
    }

    return (
        <div className="App">
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed className={'container'}>
                <Grid container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todoLists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return (
                                <Grid key={tl.id} item sx={{padding: '10px 0'}}>
                                    <Paper elevation={4}>
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatusTask}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTAskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
