import React, { useState, useEffect} from 'react'
import { Formik, Field, Form } from 'formik'
import { todoSchema } from '../utilities/validationSchema'
import axios from 'axios'//we need axios here to getCategories for a dropdown list

export default function TodoForm(props) {
    //We need to get categories formt he API to poplate a dropdown list in our form
    const [categories, setCategories] = useState([])
    
    const getCategories = () => {
        axios.get(`https://localhost:7236/api/Categories`).then(response => setCategories(response.data))
    }
    
    const handleSubmit = (values) => {
        console.log(values)
        //Below is the creat portion of handleSubmit()
        if (!props.todo) {
            const todoToCreate= values

            axios.post(`https://localhost:7236/api/ToDoes`, todoToCreate).then(() => {
                props.getTodos()//updates Todos from the API
                props.setShowCreate(false)//close the create form
            })
        }
        //Below is the edit portion of handleSubmit()
        else {
            const todoToEdit = {
                toDoId: props.todo.toDoId,
                name: values.name,
                done: values.done,
                categoryId: values.categoryId
            }

            axios.put(`https://localhost:7236/api/ToDoes/${props.todo.toDoId}`, todoToEdit).then(() =>{
                props.getTodos()
                props.setShowEdit(false)
            })
        }
       
    }

    useEffect(() => {
        getCategories()
    }, []);


  return (
    <Formik
        initialValues={{
            name: props.todo ? props.todo.name : '',
            done: props.todo ? props.todo.done : false,
            categoryId: props.todo ? props.todo.categoryId : ''
        }}
        validationSchema={todoSchema}
        onSubmit={(values) => handleSubmit(values)}
    >
        {/* start with the structure below and place your form in the empty parens
            {({errors, touched}) =>()}
        */}
        {({errors, touched}) => (
            <Form id='todoForm'>
                <div className='form-group m-3'>
                    <Field name='name' className='form-control' placeholder='Name'/>
                    {errors.name && touched.name ? (
                        <div className='text-danger'>{errors.name}</div>
                    ) : null
                    }
                </div>
                <div className='form-group m-3'><span>Is it Done?   </span>
                    <label><Field name='done' className='checkbox' type='checkbox' placeholder='Complete' /></label>
                    {errors.done && touched.done ? (
                        <div className='text-danger'>{errors.done}</div>
                    ) : null
                    }
                </div>
                <div className='form-group m-3'>
                    <Field as='select' name='categoryId' className='form-control'>
                        <option value='' disabled>[--Please Choose--]</option>
                        {/* Below we will map an option for every category in the API */}
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catName}
                            </option>
                        )}
                    </Field>
                </div>
                <div className='form-group m-3'>
                    <button type='submit' className='btn btn-info m-3'>Submit Resrouce to API</button>
                </div>
            </Form>
        )}



    </Formik>
  )
}
