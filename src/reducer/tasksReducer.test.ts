import {v1} from "uuid";
import {TasksStateType, TodolistType} from "../App";
import {addTaskAC, tasksReducer} from "./tasksReducer";

let todolistId1 = v1();
let todolistId2 = v1();

export const startTodoListState: TodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

export const startTasksState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false}
    ],
        [todolistId2]: [
        {id: v1(), title: "Milk", isDone: false},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

test('should add task correctly', ()=> {

    let newTitle = 'Buy Colla'
    let todoListId = startTodoListState[1].id

    const endTasksState = tasksReducer(startTasksState, addTaskAC(newTitle, todoListId))

    expect(endTasksState).not.toBe(startTasksState)
    expect(endTasksState[todoListId].length).toBe(3)
    expect(endTasksState[todoListId][0].title).toBe(newTitle)
})