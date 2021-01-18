import React from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

//This is the edit form

const EditModal = React.memo(
  ({ list, text = "", title="",priority="" , onChangeText, onChangeTitle, onChangePriority, closeForm, children, show = false }) => {
    const titleholder= list ? "Enter list title..." :"Enter card title:";

    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";
      
        return (    
          <>   
            <Modal show={show}
            onHide={()=>closeForm(false)}
            >
              <div className="modalCardEdit">
              <Modal.Header closeButton>
                <Modal.Title>Edit Card</Modal.Title>
              </Modal.Header>
              <Modal.Body>
      
      <Form>
        <Form.Group>
          <Form.Label style={{marginRight:".5rem",color:"white"}}>Title</Form.Label>
          <Form.Control style={{backgroundColor:"#6c757d",color:"white",width:"440px",height:"35px"}}  type="text" placeholder={titleholder} maxLength="15"
          value={title} onChange={e =>onChangeTitle(e)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} style={{backgroundColor:"#6c757d",color:"white",width:"440px",maxHeight:"15rem",resize:"none"}}  type="text" maxLength="200"placeholder={placeholder} 
          value={text} onChange={e =>onChangeText(e)}></Form.Control>
        </Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control  style={{backgroundColor:"#6c757d",color:"white",width:"440px",height:"35px"}}  as="select" defaultValue={priority} onChange={e=> onChangePriority(e)}>
              <option></option>
              <option value={'danger'}>High</option>
              <option value={'warning'}>Medium</option>
              <option value={'success'}>Low</option>
     
            </Form.Control>
        </Form>
     </Modal.Body>
              <Modal.Footer>
                {children}
              </Modal.Footer>
              </div>
            </Modal>
          </>
        );
      }
      );

export default EditModal;