import {v1} from "uuid";
import {FilterValuesType} from "../App";
import {startTodoListState} from "./tasksReducer.test";
import {
    addTodoListAC,
    changeFilterAC,
    changeTodoListTitleAC,
    removeTodolistAC,
    todoListReducer
} from "./todoListReducer";

test('correct filter of todolist should be change', () => {
    let newFilter: FilterValuesType = "completed"
    let todolistId = startTodoListState[1].id

    const endTodoListState = todoListReducer(startTodoListState, changeFilterAC(newFilter, todolistId))

    expect(endTodoListState).not.toBe(startTodoListState)
    expect(endTodoListState[1].filter).toBe(newFilter)
    expect(endTodoListState.length).toBe(2)
})

test('correct todolist should be add', () => {
    let newId = v1()
    let newTitleTodolist = 'What to lessen'

    const endTodoListState = todoListReducer(startTodoListState, addTodoListAC(newTitleTodolist, newId))

    expect(endTodoListState).not.toBe(startTodoListState)
    expect(endTodoListState.length).toBe(3)
    expect(endTodoListState[0].title).toBe(newTitleTodolist)
    expect(endTodoListState[0].id).toBe(newId)
})

test('correct title of todolist should be change', () => {
    let newTitle = 'What to lessen'
    let todolistId = startTodoListState[0].id

    const endTodoListState = todoListReducer(startTodoListState, changeTodoListTitleAC(todolistId, newTitle))

    expect(endTodoListState).not.toBe(startTodoListState)
    expect(endTodoListState[0].title).toBe(newTitle)
    expect(endTodoListState.length).toBe(2)
})

test('correct todolist should be remove', () => {
    let todolistId = startTodoListState[0].id

    const endTodoListState = todoListReducer(startTodoListState, removeTodolistAC(todolistId))

    expect(endTodoListState).not.toBe(startTodoListState)
    expect(endTodoListState.length).toBe(1)
    expect(endTodoListState[0].title).toBe("What to buy")
})