import React from "react";
import {TypeTasks} from "./Todolist";

type TaskPropsType = {
    el: TypeTasks
    removeTask: (id: number) => void
}

export const Task = (props: TaskPropsType) => {
    return (
        <li>
            <input type="checkbox" checked={props.el.isDone}/> <span>{props.el.title}</span>
            <button onClick={() => {
                props.removeTask(props.el.id)
            }}>x
            </button>
        </li>
    )
}
