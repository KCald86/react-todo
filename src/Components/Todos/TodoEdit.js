import React from 'react'
import { Modal } from 'react-bootstrap'
import TodoForm from './TodoForm'

export default function TodoEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}
    >
        <Modal.Header>
            <h3>Editing {props.todo.name}</h3>
        </Modal.Header>
        <Modal.Body>
            <TodoForm
                todo={props.todo}
                setShowEdit={props.setShowEdit}
                getTodos={props.getTodos} />
        </Modal.Body>
    </Modal>
  )
}
