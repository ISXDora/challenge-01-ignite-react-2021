import { ChangeEvent, EventHandler, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const timestamp = new Date().getTime()


  function handleCreateNewTask() {
    setTasks((state) => [...state, {id : timestamp, isComplete: false, title: newTaskTitle}])
    setNewTaskTitle('') 
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(task => {
      if(task.id === id){
          task.isComplete === false ? task.isComplete = true : task.isComplete = false
      }
      return task
    })
      setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    const remainingTasks = tasks.filter(task => task.id !== id)
    setTasks(remainingTasks)
  }

 const emptyTask = newTaskTitle.length === 0

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask} disabled={emptyTask} >
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}