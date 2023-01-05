import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export const Counter = () => {

    let [data, setData] = useState(5)

    // let arr = useState(5);
    // let data = arr[0];
    // let setData = arr[1]

    return <div onClick={() => {
        setData(data + 1)
    }}>
        {data}
        <button>+</button>
    </div>
}

function App() {
    const header = 'What to learn';

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ]);
    // const tasks2 = [
    //     { id: 1, title: "Hello world", isDone: true },
    //     { id: 2, title: "I am Happy", isDone: false },
    //     { id: 3, title: "Yo", isDone: false },
    //     { id: 4, title: "Yo", isDone: true }
    // ]


    return (
        <div className="App">
            <Todolist header={header} tasks={tasks}/>
        </div>
    );
}

export default App;
