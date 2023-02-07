import React, {ChangeEvent, KeyboardEvent, RefObject, useRef, useState} from "react";

type AddItemFormPropsType = {
    addItem: (newValue: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    let newValue: RefObject<HTMLInputElement> = useRef(null);


    const addItem = () => {
        if (newValue.current) {
            let newTitle = newValue.current.value.trim();
            if (newTitle !== "") {
                props.addItem(newTitle);
            } else {
                setError("Title is required");
            }
            newValue.current.value = ''
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return (
        <div>
            <input
                // value={title}
                ref={newValue}
                // onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )

}