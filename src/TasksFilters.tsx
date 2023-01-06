import React from "react";
import {FilterValueType} from "./App";

type TaskFiltersPropsType = {
    changeFilter: (value: FilterValueType) => void
}

export const TaskFilters = (props: TaskFiltersPropsType) => {
    return (
        <div>
            <button onClick={() => {
                props.changeFilter('all')
            }}>All
            </button>
            <button onClick={() => {
                props.changeFilter('active')
            }}>Active
            </button>
            <button onClick={() => {
                props.changeFilter('completed')
            }}>Completed
            </button>
        </div>
    )
}