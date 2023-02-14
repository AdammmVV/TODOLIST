import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { DataGrid } from '@mui/x-data-grid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTAskTitle: (id: string, title: string, todolistId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const addItem = (newTitle: string) => {
        props.addTask(newTitle, props.id);
    }

    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const changeTitle = (id: string, title: string) => {
        props.changeTAskTitle(id, title, props.id)
    }
    const changeTitleHandler = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    return <div>
        <h3>
            <Typography variant={'h6'} align={'center'} fontWeight={'600'}>
                <EditableSpan title={props.title} changeTitle={changeTitleHandler}/>
            </Typography>

            <IconButton onClick={removeTodolist} color={'primary'}>
                <DeleteForeverRoundedIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addItem}/>
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    const changeTitleHAndler = (title: string) => {
                        changeTitle(t.id, title)
                    }

                    return <ListItem key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox size={'small'} onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} changeTitle={changeTitleHAndler}/>
                        <IconButton onClick={onClickHandler} size={'small'}>
                            <DeleteForeverRoundedIcon/>
                        </IconButton>
                    </ListItem>
                })
            }
        </List>
        <div style={{display: 'flex', gap: '10px'}}>
            <Button
                size='small'
                variant='contained'
                color={props.filter === 'all' ? "secondary" : 'primary'}
                disableElevation
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                size='small'
                variant='contained'
                color={props.filter === 'active' ? "secondary" : 'primary'}
                disableElevation
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                size='small'
                variant='contained'
                color={props.filter === 'completed' ? "secondary" : 'primary'}
                disableElevation
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

