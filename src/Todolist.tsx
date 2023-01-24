import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./component/Button";
import s from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addPost: (v: string) => void
    changeStatus: (eventStatus: boolean, taskId: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    function addTaskHandler() {
        if(title.trim() !== '') {
            props.addPost(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const tsarOnClick = (nameButton: FilterValuesType) => {
        props.changeFilter(nameButton)
    }

    const removeButton = (id: string) => {
        props.removeTask(id)
    }
    console.log(props.filter)

    const changeStatusHandler = ( e: boolean, taskId: string) => {
        props.changeStatus(e, taskId)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.error : ''}
                   value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        {error && <div className={s.errorMessage}>{error}</div>}
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={s.isDone}>
                        <input type="checkbox"
                               onChange={(e)=>changeStatusHandler(e.currentTarget.checked, t.id)}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {
                            removeButton(t.id)
                        }}>x
                        </button>
                    </li>
                })
            }
        </ul>
        <div>
            <Button style={props.filter === 'all' ? s.activeFilter : ''} name={'all'} callBack={() => tsarOnClick('all')}/>
            <Button style={props.filter === 'active' ? s.activeFilter : ''} name={'active'} callBack={() => tsarOnClick('active')}/>
            <Button style={props.filter === 'completed' ? s.activeFilter : ''} name={'completed'} callBack={() => tsarOnClick('completed')}/>
        </div>
    </div>
}
