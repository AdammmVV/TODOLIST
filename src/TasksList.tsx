import React from "react";
import {TypeTasks} from "./Todolist";
import {TaskFilters} from "./TasksFilters";
import {FilterValueType} from "./App";
import {Task} from "./Task";

type TasksListPropsType = {
    tasks: Array<TypeTasks>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}

export const TasksList = (props: TasksListPropsType) => {
    return (
        <div>
            <ul>
                {props.tasks.map((el) => {
                    return (
                        <Task el={el} removeTask={props.removeTask}/>
                    )
                })}
            </ul>
            <TaskFilters changeFilter={props.changeFilter}/>
        </div>

    )
}
