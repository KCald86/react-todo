//This file will house the schemas for both resources and categories for our create/edit form. To bring in a simple validation implementation, we are going to use Yup by installing it into our app (npm install yup) see implementation below

//Yup will work in tandem with Formik, which is an npm package that creates and stores form inputs for each item
//(categoryName, categoryDescription) that we need to capture in our forms. (npm install formik)

/* This is what we need for category POST. We will have inputs for eachin the form
    {
        'categoryName' : 'Test',
        'categoryDescription': 'Test desc'
    }
*/
import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    //Below we call to each property that will need to be validated and use Yup to define the requirements
    //for each property (required, maxLength, etc.)
    catName: Yup.string().max(25,'Max 25 characters').required('Required'),
    catDesc: Yup.string().max(100,'Max 100 characters')
})

const todoSchema = Yup.object().shape({
    name: Yup.string().max(100,'Max 100 characters').required('Required'),
    done: Yup.bool().required('Required'),
    categoryId: Yup.number()
})

export { todoSchema }
export default catSchema