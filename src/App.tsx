import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


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
    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => {
            return t.id != id;
        }))
    }



    return (
        <div className="App">
            <Todolist header={header}
                      tasks={tasks}
                      removeTask={removeTask}/>
        </div>
    );
}

export default App;
