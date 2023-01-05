import React from "react";
import {FilterValueType} from "./App";

type TodolistPropsType = {
    header: string
    tasks: Array<TypeTasks>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}

type TypeTasks = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.header}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    return (
                        <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                            <button onClick={ () => { props.removeTask(el.id) } }>x</button>
                        </li>

                    )
                })}
            </ul>
            <div>
                <button onClick={ () => { props.changeFilter('all') } }>All</button>
                <button onClick={ () => { props.changeFilter('active') } }>Active</button>
                <button onClick={ () => { props.changeFilter('completed') } }>Completed</button>
            </div>
        </div>
    )
}