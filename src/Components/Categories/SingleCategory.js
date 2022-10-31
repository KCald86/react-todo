import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import axios from 'axios'
import CatEdit from './CatEdit'

export default function SingleCategory(props) {
  const {currentUser} = useAuth()

  const [showEdit, setShowEdit] = useState(false);

  //Below is our logic for delete
  const deleteCat = (id) => {
    if (window.confirm(`Are you sure you want to delete ${props.category.catName}?`)) {
      axios.delete(`https://localhost:7236/api/Categories/${id}`).then(() => {props.getCategories()})
    }
  }

  return (
    <tr>
      <td>{props.category.catName}</td>
      <td>{props.category.catDesc}</td>
      {/* EDIT/Delete UI */}
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <td>
          <button className='m-1 rounded' id='editLink' onClick={() => setShowEdit(true)}>
            <FaEdit />
          </button>
          <button className='m-1 rounded' id='deleteLink' onClick={() => deleteCat(props.category.categoryId)}>
              <FaTrashAlt />
            </button>
          {showEdit &&
            <CatEdit
              showEdit={showEdit}//tied to the opening/closing of the modal (if true, modal opens)
              setShowEdit={setShowEdit}//tied to closing the modal in CatEdit
              getCategories={props.getCategories}//needed for running a GET request after editing
              category={props.category}//needed for populating the edit form
            />
          }
        </td>
      }
      {/* END OF EDIT UI */}
    </tr>
  )
}
