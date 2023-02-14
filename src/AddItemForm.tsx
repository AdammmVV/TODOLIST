import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import {IconButton, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (newValue: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    return (
        <div>
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
                label={'Enter yor title'}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTask} color={'primary'} size={'small'}>
                <AddBoxRoundedIcon/>
            </IconButton>
        </div>
    )

}