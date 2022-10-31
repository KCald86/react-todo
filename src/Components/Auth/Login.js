import React from 'react'
//Below we import our useAuth object to access currentUser, login and logout.
//Remember to create the hook to access any of these three, see below for the implimentation
import { useAuth } from '../../contexts/AuthContext'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleAuth() {
        //Await keyword to pause any more code from executing until we get a response back from firebase
        await login()

        //return the user to a specific location using  useNavigate from react-router-dom
        return navigate('/')
    }

  return (
    <div className='login'>
        <article className='bg-info mb-5 p-5 text-dark'>
            <h1 className='text-center'>Your ToDo Application</h1>
        </article>
        <Container>
            <Card className='m-2 border-dark text-center'>
                <Card.Header className='bg-dark text-white'>
                <h2>Login for full functionality</h2>
                </Card.Header>
                <Card.Body>
                    <button className='btn btn-success' onClick={() => handleAuth()}>
                        Login w/ Github
                    </button>
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}
