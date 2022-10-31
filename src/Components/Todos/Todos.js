import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
//npm install axios - the package that handles our API calls 
import axios from 'axios'
import SingleToDo from './SingleToDo'
import './Todos.css'
import FilterCat from './FilterCat'
import { useAuth } from '../../contexts/AuthContext'
import TodoCreate from './TodoCreate'

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the Todos
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each Todo to the screen (also add any supplemental UI (table and thead)...combo of Todos and SingleToDo)

export default function Todos() {
    const {currentUser} = useAuth()
    //Below is our hook to show/hide the create form
    const [showCreate, setShowCreate] = useState(false)

    //Below is a hook to stare the data returned from the API
    const [todos, setTodos] = useState([]);
    //We set useState for our hook above to [] so .map will not error out before data is returned. .map needs a collection

    //Filtering steps - use .filter() to create a limited list of Todos.
    //1. Create a hook that will store values for what the user wants to filter Todos by...this hook will store the categoryId for the category they want to filter by.
    //2. place the conditional rendering for when filter === 0 in the initial map of Todos
    //3. Create FilterCat to give the buttons to the user to filter by
    //4. Render in Todos...see below
    //5. Create the conditional rendering for when filter != 0...see below

    //Below we set useState to default to 0 because there is no CategoryId of 0
    const [filter, setFilter] = useState(0);




    //Below we write a function to get our Todos from the API
    const getTodos = () => {
        axios.get(`https://localhost:7236/api/ToDoes`).then(response => {
            console.log(response)
            setTodos(response.data)
        })
    }

    //Below is our useEffect() to automate retrieval of data. 1st param is a function, 2nd param is an array of
    //objects that we can listen for (by default [] is just going to run once as the component mounts in the UI)
    // uef -> tab
    useEffect(() => {
        getTodos()
    }, []);

  return (
    <section className='todos'>
        <article className='bg-info p-5'>
            <h1 className='text-center'>Todos Dashboard</h1>
        </article>
        {/* CREATE UI */}
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
            <div className='bg-dark p-2 mb-3 text-center'>
                <button className='btn btn-info' onClick={() => setShowCreate(!showCreate)}//will pass the opposite of what it's current state is
                >
                    {!showCreate ? 'Create New Todo' : 'Close Form'}
                </button>
                <div className='createContainer'>
                    {showCreate &&
                        //Conditionally render TodoCreate if showCreat is true
                        <TodoCreate getTodos={getTodos} setShowCreate={setShowCreate} />
                    }
                </div>
            </div>
        }
        {/* END OF CREATE UI */}
        <FilterCat setFilter={setFilter} />
        <Container className='p-2'>
            <article className='todoGallery row justify-content-center'>
                {/* Below we write conditional rendering to see if the user is trying to filter
                results or not, and display the right resrouces accordingly. */}
                {filter === 0 ? todos.map(x =>
                    //SingleToDo will map each Todo to a tile in our display. We add
                    //getTodos so we can pass GET request functionality into SingleToDo
                    //for Edit/Delete (we added this during edit/Delete functionality)
                    <SingleToDo key={x.toDoId} todo={x} getTodos={getTodos} />
                ) :
                todos.filter(x => x.categoryId === filter).map(x =>
                    <SingleToDo key={x.toDoId} todo={x} getTodos={getTodos} />      
            )}
            {filter !== 0 && todos.filter(x => x.categoryId === filter).length === 0 &&
                <h2 className='alert alert-warning text-dark'>
                    There are no results for this category.
                </h2>
            }
            </article>
            
        </Container>
    </section>
  )
}
