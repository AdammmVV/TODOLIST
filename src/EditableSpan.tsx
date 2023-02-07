import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <input
                value={title}
                onChange={onChangeHandler}
                onBlur={offEditMode}
                type="text"
                autoFocus/>
            : <span onDoubleClickCapture={onEditMode}>{props.title}</span>
    )
}