import React, {useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./component/Button";

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
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')


    function addTaskHandler() {
        props.addPost(title)
        setTitle('')
    }

    const tsarOnClick = (nameButton: FilterValuesType) => {
        props.changeFilter(nameButton)
    }

    const removeButton = (id:string) => {
        props.removeTask(id)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {removeButton(t.id)}}>x</button>
                </li>)
            }
        </ul>
        <div>
            <Button name={'all'} callBack={()=>tsarOnClick('all')}/>
            <Button name={'active'} callBack={()=>tsarOnClick('active')}/>
            <Button name={'completed'} callBack={()=>tsarOnClick('completed')}/>
        </div>
    </div>
}
