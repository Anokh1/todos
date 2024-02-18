import './App.css';
import Axios, { toFormData } from "axios";
import { useState, useRef, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputTextarea } from "primereact/inputtextarea";
import todoCard from './components/todoCard';
import { OverlayPanel } from 'primereact/overlaypanel';
import { AboutPage } from './pages/aboutPage';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation';


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  const [id, setID] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(0);

  const [newTitle, setNewTitle] = useState("Testo");
  const [newTodo, setNewTodo] = useState("");

  const [todoList, setTodoList] = useState([]);

  // useRef to store data between renders
  const toastRef = useRef();
  const op = useRef(null);

  // CREATE
  const addTodo = () => {
    if (name && title !== "") {
      Axios.post("http://localhost:3001/create", {
        name: name,
        title: title,
        description: description,
        done: done,
      }).then(() => {
        console.log("Success");
        setTodoList([...todoList, {
          name: name,
          title: title,
          description: description,
          done: done,
        }]);
      })
      // setTimeout(function () {
      //   clearField();
      //   getTodo();
      // }, 300);
      // toastRef.current.show({ severity: 'success', summary: 'Information added', detail: 'Please complete your todo' });
    } else {
      // toastRef.current.show({ severity: 'error', summary: 'Insufficient information', detail: 'Please input missing information' });
    }
  };

  // READ
  const getTodo = () => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setTodoList(response.data);
    })
  };

  const getTitle = (id) => {
    Axios.get("http://localhost:3001/readTitle", { id }).then((response) => {
      console.log(id);
      // console.log(response.data.title); 
      console.log(todoList[0].name);
      setNewTitle(todoList[0].title);
      op.current.toggle(true);
    })
  }

  // useEffect to perform side effects (fetching data)
  useEffect(() => {
    getTodo();
  }, []);


  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/about" component={AboutPage} />s
        </Routes>
      </div>
      <header className="App-header">
        <h1>T O D O</h1>

        <span className="p-float-label">
          <InputText onChange={(e) => setName(e.target.value)} ></InputText>
          <label htmlFor="name">Name</label>
        </span>

        <span className="p-float-label">
          <InputText onChange={(e) => setTitle(e.target.value)} ></InputText>
          <label htmlFor="title">Title</label>
        </span>

        <span className="p-float-label">
          <InputText onChange={(e) => setDescription(e.target.value)} ></InputText>
          <label htmlFor="description">Description</label>
        </span>

        <br />
        <Button onClick={addTodo} type="submit" label="Submit" />
      </header>

      <div>
        {todoList.map((val, key) => {
          return (
            <div className="card flex justify-content-center todoCard">
              {/* <todoCard
                id={val.id}
                name={val.name}
                title={val.title}
                description={val.description}
                done={val.done}
                createdDate={val.createdDate}
              /> */}

              <Card title={val.title} subTitle={"Created by " + val.name + " on " + new Date(val.createdDate).toDateString()} className="md:w-25rem">
                <p className="m-0">
                  {val.todo}
                </p>
                <Button onClick={(e) => op.current.toggle(e)} label='Update'></Button>
                <OverlayPanel ref={op}>
                  <InputText
                    id='newTitle'
                    defaultValue={todoList[0].title}
                    // defaultValue={(val.title === null) ? "" : val.title}
                    // defaultValue={(val.title == undefined) ? "" : val.title}
                    className='editInput'
                    // placeholder="New Title"
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ marginBottom: '1em' }}
                  />
                </OverlayPanel>
              </Card>

            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
