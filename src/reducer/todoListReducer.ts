import {FilterValuesType, TodolistType} from "../App";


export const todoListReducer = (state: Array<TodolistType>, action: MainType): Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            const newTodo: TodolistType = {
                id: action.payload.newId,
                title: action.payload.newTitle,
                filter: 'all'
            }
            return [newTodo, ...state]
        case "CHANGE-FILTER":
            return state
                .map(t => t.id === action.payload.todolistId
                    ? {...t, filter: action.payload.valueFilter}
                    : t)
        case "CHANGE-TODOLIST-TITLE":
            return state
                .map(t => t.id === action.payload.todoListId
                    ? {...t, title: action.payload.newTitle}
                    : t)
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.payload.id)
        default:
            return state
    }
}


type MainType = ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof removeTodolistAC>

export const addTodoListAC = (newTitle: string, newId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTitle,
            newId,
        }
    } as const
}

export const changeFilterAC = (valueFilter: FilterValuesType, todolistId: string) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            valueFilter,
            todolistId,
        }
    } as const
}

export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todoListId,
            newTitle,
        }
    } as const
}

export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id
        }
    } as const
}