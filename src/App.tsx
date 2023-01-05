import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

// export const Counter = () => {
//
//     let [data, setData] = useState(5)
//
//     // let arr = useState(5);
//     // let data = arr[0];
//     // let setData = arr[1]
//
//     return <div onClick={() => {
//         setData(data + 1)
//     }}>
//         {data}
//         <button>+</button>
//     </div>
// }

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const header = 'What to learn';

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ]);

    let [filter, setFilter] = useState('completed')

    // const tasks2 = [
    //     { id: 1, title: "Hello world", isDone: true },
    //     { id: 2, title: "I am Happy", isDone: false },
    //     { id: 3, title: "Yo", isDone: false },
    //     { id: 4, title: "Yo", isDone: true }
    // ]
    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => {
            return t.id != id;
        }))
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    let TasksForTodolist = tasks
    if (filter === 'active') {
        TasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        TasksForTodolist = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <Todolist header={header}
                      tasks={TasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
