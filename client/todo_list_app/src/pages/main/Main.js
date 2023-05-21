import React from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import './Main.css';

function Main() {
  const [taskContent, setTaskContent] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');

  //add new todo task to database
  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/tasks', { description: taskContent })
      setTaskList(prev => [...prev, res.data]);
      setTaskContent('');
    } catch (error) {
      console.log(error);
    }
  }

  //create function to fetch all todo tasks from data base
  useEffect(() => {
    const getTasksList = async (id) => {
      try {
        const res = await axios.get(`http://localhost:3000/tasks/${id}`)
        setTaskList(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTasksList()
  }, []);


  //delete task when click the delete button
  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/tasks/${id}`)
      const newTaskList = taskList.filter(task => task._id !== id);
      setTaskList(newTaskList);
    } catch (error) {
      console.log(error);
    }
  }

  //Update item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`http://localhost:3000/tasks/${isUpdating}`, { description: updateItemText });
      console.log(res.data);
      const updatedTaskIndex = taskList.findIndex((task) => task._id === isUpdating);
      const updatedTaskList = [...taskList];
      updatedTaskList[updatedTaskIndex].description = updateItemText;
      setTaskList(updatedTaskList);
      setUpdateItemText('');
      setIsUpdating('');
    } catch (err) {
      console.log(err);
    }
  };


  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e) => { updateItem(e) }} >
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e => { setUpdateItemText(e.target.value) }} value={updateItemText} />
      <button className="update-new-btn" type="submit">Update</button>
    </form>
  )



  return (
    <div>
      <div className="main">
        <h1>My Todo List</h1>
        <form onSubmit={e => addTask(e)}>
          <div className='top'>
            <input type="text" placeholder="Add Todo Item" onChange={e => { setTaskContent(e.target.value) }} value={taskContent} />
            <button type="submit">Add New Task</button>
          </div>
        </form>
        <div className="toDoItemList">
          {
            taskList.map(task => (
              <div className="toDoItem">
                {
                  isUpdating === task._id
                    ? renderUpdateForm()
                    : <>

                      <FontAwesomeIcon icon={faCircleCheck} />
                      <p className="taskName" key="{task}">{task.description}</p>
                      <FontAwesomeIcon icon={faPenToSquare} onClick={() => { setIsUpdating(task._id) }} />
                      <FontAwesomeIcon icon={faTrash} onClick={() => { deleteTask(task._id) }} />
                    </>
                }
              </div>
            ))
          }

        </div>


      </div>
    </div>
  )
}

export default Main