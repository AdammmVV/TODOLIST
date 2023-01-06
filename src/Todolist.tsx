import React from "react";
import {FilterValueType} from "./App";
import {TodolistHeader} from "./TodolistHeader";
import {TasksList} from "./TasksList";
import {AddTaskForm} from "./AddTaskForm";

type TodolistPropsType = {
    header: string
    tasks: Array<TypeTasks>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}

export type TypeTasks = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <TodolistHeader header={props.header}/>
            <AddTaskForm />
            <TasksList tasks={props.tasks}
                       removeTask={props.removeTask}
                       changeFilter={props.changeFilter}/>
        </div>
    )
}