import React, {useState} from "react";

type TodolistPropsType = {
    header: string
    tasks: Array<TypeTasks>
    removeTask: (id: number) => void
    // changeFilter: (value: FilterValueType) => void
}

type TypeTasks = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    type FilterValueType = 'all' | 'active' | 'completed'

    let [filter, setFilter] = useState('all')
    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    let TasksForTodolist = props.tasks
    if (filter === 'active') {
        TasksForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        TasksForTodolist = props.tasks.filter(t => t.isDone)
    }
    return (
        <div>
            <h3>{props.header}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {TasksForTodolist.map((el) => {
                    return (
                        <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                            <button onClick={ () => { props.removeTask(el.id) } }>x</button>
                        </li>

                    )
                })}
            </ul>
            <div>
                <button onClick={ () => { changeFilter('all') } }>All</button>
                <button onClick={ () => { changeFilter('active') } }>Active</button>
                <button onClick={ () => { changeFilter('completed') } }>Completed</button>
            </div>
        </div>
    )
}