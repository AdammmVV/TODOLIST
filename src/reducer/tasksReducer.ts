import {TasksStateType} from "../App";
import {v1} from "uuid";


export const tasksReducer = (state: TasksStateType, action: MainType): TasksStateType => {
    switch (action.type) {
        case "ADD-NEW-TASKS":
            return {[action.payload.newId]: [], ...state}
        case "REMOVE-TASKS":
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        case "CHANGE-STATUS-TASK":
            return {...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => t.id === action.payload.id ? {...t, isDone: action.payload.isDone} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => t.id === action.payload.id ? {...t, title: action.payload.title} : t)
            }
        case "DELETE-TASKS":
            delete state[action.payload.todolistId]
            return state
        default:
            return state
    }
}

type MainType = ReturnType<typeof addNewTasksAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeStatusTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof deleteTasksAC>

export const addNewTasksAC = (newId: string) => {
    return {
        type: "ADD-NEW-TASKS",
        payload: {
            newId
        }
    } as const
}

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASKS",
        payload: {
            id,
            todolistId,
        }
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

export const changeStatusTaskAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-STATUS-TASK",
        payload: {
            id,
            isDone,
            todolistId,
        }
    } as const
}

export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            id,
            title,
            todolistId,
        }
    } as const
}

export const deleteTasksAC = (todolistId: string) => {
    return {
        type: "DELETE-TASKS",
        payload: {
            todolistId
        }
    } as const
}