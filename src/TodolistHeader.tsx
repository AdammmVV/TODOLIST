import React from "react";

type TodolistHeaderPropsType = {
   header: string
}

export const TodolistHeader = (props: TodolistHeaderPropsType) => {
    return <h3>{props.header}</h3>
}
