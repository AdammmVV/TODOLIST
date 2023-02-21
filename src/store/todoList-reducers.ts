import {FilterValuesType, TodolistType} from "../App";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todolistId: string
    }
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        filter: FilterValuesType
        todoListId: string
    }
}

export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        title: string
        todoListId: string
    }
}

export type MainType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListFilterAT
    | ChangeTodoListTitleAT

export const todoListReducer = (state: TodolistType[], action: MainType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.todolistId)
        case "ADD-TODOLIST":
            const newTodo: TodolistType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all'
            }
            return [newTodo, ...state]
        case "CHANGE-TODOLIST-FILTER":
            return state
                .map(t => t.id === action.payload.todoListId
                    ? {...t, filter: action.payload.filter}
                    : t)
        case "CHANGE-TODOLIST-TITLE":
            return state
                .map(t => t.id === action.payload.todoListId
                    ? {...t, title: action.payload.title}
                    : t)
        default:
            return state
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId: id
        }
    }
}

export const AddTodoListAC = (newTitle: string, newId: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            id: newId,
            title: newTitle
        }
    }
}

export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListId: string): ChangeTodoListFilterAT => {
    return {
        type:"CHANGE-TODOLIST-FILTER",
        payload: {
            filter: filter,
            todoListId: todoListId
        }
    }
}

 export const ChangeTodoListTitleAC = (newTitle: string, newId: string): ChangeTodoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            title: newTitle,
            todoListId: newId
        }
    }
 }