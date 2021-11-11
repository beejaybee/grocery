import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({items, removeItem, editItem}) => (
  <div className="">
    {items.map(item => {
      const {id, title} = item;
      return (
        <article key={id} className="grocery-item">
          <p className="title"> {title} </p>
          <div className="">
            <button className="edit-btn" onClick={() => editItem(id)}> 
              <FaEdit />
            </button>
            <button className="delete-btn" onClick={() => removeItem(id)}> 
              <FaTrash />
            </button>
          </div>
          
        </article>

      )
    })}
  </div>
)

export default List
