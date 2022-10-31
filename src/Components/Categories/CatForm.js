import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import React from 'react'
import catSchema from '../utilities/validationSchema'

export default function CatForm(props) {

    const handleSubmit = (values) => {
        console.log(values)
        if (!props.category) {
            //Below is the logic for creating a new category
            const catToCreate = values//assemble a temp object to send our request

            //send the object in a POST request to the API
            axios.post(`https://localhost:7236/api/Categories`, catToCreate).then(() => {
                props.setShowCreate(false)//This will close the form. We passed this callback function from Categories.js
                props.getCategories()//This makes a GET request to the API, also passed from Categories.js
            })
        }
        //Below is the Edit logic of handleSubmit()
        else {
            //Because our form ony captures the Category name and description, we need to pass an entire object into the PUT request, including the cateogryId
            const catToEdit = {
                categoryId: props.category.categoryId,
                catName: values.catName,
                catDesc: values.catDesc
            }

            axios.put(`https://localhost:7236/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.setShowEdit(false)
                props.getCategories()
            })
        }
    }

  return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik
            initialValues={{
                //Below is ternary operator that makes our form behave differently based on whether we have a prop called category (if we have one, we're editing, if now it's a create form)
                catName: props.category ? props.category.catName : '',
                catDesc: props.category ? props.category.catDesc : ''
            }}
            validationSchema={catSchema}
            onSubmit={(values) => handleSubmit(values)}
        >

            {({errors, touched}) => (
                //Inside these parens we will build our form
                <Form id='catForm' className='row text-center m-auto'>
                    <div className='form-gorup m-1 p-1'>
                        <Field name='catName' className='form-control' placeholder='Name'/>
                        {errors.catName && touched.catName ?
                            <div className='text-danger'>{errors.catName}</div>
                    : null}
                    </div>
                    <div className='for-group m-1 p-1'>
                        <Field name='catDesc' className='form-control' placeholder='Description' />
                        {errors.catDesc && touched.catDesc ?
                            <div className='text-danger'>{errors.catDesc}</div>
                    : null}
                    </div>
                    <div className='form-group m-1'>
                        <button type='submit' className='btn btn-success'>Submit Category to API</button>
                    </div>
                </Form>
            )}

        </Formik>
    </div>
  )
}
