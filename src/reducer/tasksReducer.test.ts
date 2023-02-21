import {v1} from "uuid";
import {TasksStateType, TodolistType} from "../App";
import {
    addNewTasksAC,
    addTaskAC,
    changeStatusTaskAC,
    changeTaskTitleAC,
    deleteTasksAC,
    removeTaskAC,
    tasksReducer
} from "./tasksReducer";

let todolistId1 = v1();
let todolistId2 = v1();

const startTodoListState: TodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

const startTasksState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false}
    ],
        [todolistId2]: [
        {id: v1(), title: "Milk", isDone: false},
        {id: v1(), title: "React Book", isDone: true}
    ]
}
test('correct in array tasks should be add', () => {
    let newId = v1()

    const endTasksState = tasksReducer(startTasksState, addNewTasksAC(newId))

    expect(endTasksState).not.toBe(startTasksState)
    expect(startTasksState[newId]).toBe(undefined)
    expect(endTasksState[newId]).toEqual([])
})

test('correct task should be remove', () => {

    let todoListId = startTodoListState[1].id
    let taskId = startTasksState[todoListId][0].id

    const endTasksState = tasksReducer(startTasksState, removeTaskAC(taskId, todoListId))

    expect(endTasksState).not.toBe(startTasksState)
    expect(endTasksState[todoListId].length).toBe(1)
    expect(endTasksState[todoListId][0].title).toBe("React Book")

})

test('should add task correctly', ()=> {

    let newTitle = 'Buy Colla'
    let todoListId = startTodoListState[1].id

    const endTasksState = tasksReducer(startTasksState, addTaskAC(newTitle, todoListId))

    expect(endTasksState).not.toBe(startTasksState)
    expect(endTasksState[todoListId].length).toBe(3)
    expect(endTasksState[todoListId][0].title).toBe(newTitle)
})

test('correct task should have its status changed', ()=> {

    let todoListId = startTodoListState[0].id
    let taskId = startTasksState[todoListId][1].id
    let isDoneTask = true

    const endTasksState = tasksReducer(startTasksState, changeStatusTaskAC(taskId, isDoneTask, todoListId))

    expect(endTasksState).not.toBe(startTasksState)
    expect(endTasksState[todoListId][1].isDone).toBe(isDoneTask)
    expect(endTasksState[todoListId].length).toBe(2)
})

test('correct task should be change', ()=> {
    let todoListId = startTodoListState[1].id
    let taskId = startTasksState[todoListId][0].id
    let taskTitle = 'Bear'

    const endTaskState = tasksReducer(startTasksState, changeTaskTitleAC(taskId, taskTitle, todoListId))

    expect(endTaskState).not.toBe(startTasksState)
    expect(endTaskState[todoListId].length).toBe(2)
    expect(endTaskState[todoListId][0].title).toBe(taskTitle)
})

test('correct tasks should de delete', ()=> {
    let todolistId = startTodoListState[1].id

    const endTasksState = tasksReducer(startTasksState, deleteTasksAC(todolistId))

    expect(endTasksState[todolistId]).toBe(undefined)
    expect(endTasksState[todolistId1]).toBe(startTasksState[todolistId1])
})