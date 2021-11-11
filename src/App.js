import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  }else {
    return []
  }
}

const App = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show: false, msg: '', type: ''}) 

const handleSubmit = (e) => {
  e.preventDefault();
  if(!name) {
    showAlert(true, 'danger', 'please enter a value')
  } else if (name && isEditing) {
    
    setList(
      list.map((item) => {
        return (item.id === editId) ? {...item, title: name} : item ;
        
      })
    );
    setName('');
    setIsEditing(false);
    setEditId(null);
    showAlert(true, 'success', 'item successfully edited')

  } else {
    const newList = {id: new Date().getTime().toString(), title: name};
    setList([...list, newList]);
    showAlert(true, 'success', 'you have successfully added to your grocery list')
    setName('')
  }
}

const showAlert = (show=false, type="", msg="") => {
  setAlert({show, type, msg})
}

const clearList = () => {
  showAlert(true, 'danger', 'all the items have been deleted')
  setList([]);
}

const removeItem = (id) => {
  showAlert(true, 'danger', 'item removed');
  setList(list.filter(item => item.id !== id));
}

const editItem = (id) => {
  const specificItem = list.find(item => item.id === id);
  setIsEditing(true);
  setEditId(id);
  setName(specificItem.title);
}

useEffect(() => {
  localStorage.setItem('list', JSON.stringify(list))
}, [list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {... alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input 
          type="text" 
          value={name}
          className="grocery"
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g eggs"
          />
          <button className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {
        list.length > 0 && 
        <div className="grocery-container">
          <List  
          items={ list } 
          removeItem={removeItem} 
          editItem={editItem}
          />
          <button className="clear-btn" onClick={clearList}> clear items</button>
        </div>
      }
    </section>
  )
}

export default App
