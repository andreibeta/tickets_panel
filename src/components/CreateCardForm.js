import React from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-bootstrap/Modal';

//Changed from TrelloActionButton
library.add(faPlus);
class CreateCardForm extends React.Component {
  state = {
    formOpen: false,
    title: "",
    text: "",
    priority: "success",
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false
    });
  };
  //handler for the selector
  handleChangePriority = (e) => {
    return this.setState({ priority: e.target.value });
  }
  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: ""
      });
      dispatch(addList(text));
      this.closeForm();

    }

    return;
  };

  handleAddCard = () => {
    const { dispatch, listID, boardID } = this.props;
    const { text } = this.state;
    const { title } = this.state;
    const { priority } = this.state;

    if (text && title ) {
      this.setState({
        title: "",
        text: "",
      });
      dispatch(addCard(listID, title, text, priority, boardID));
      this.closeForm();
    }
  };

  renderAddButton = () => {
    const { list } = this.props;

    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = "white"
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";


    return (
      <div
        onClick={this.openForm}
        className="openFormButtonGroup"
        style={{
          capacity: buttonTextOpacity,
          color: buttonTextColor,
          background: buttonTextBackground,

        }}
      >
        <FontAwesomeIcon size="1x" icon="plus" className="plus_icon" />
        <p className="p_class">{buttonText}</p>
      </div>
    );

  };

  renderForm = () => {
    const { list } = this.props;

    const secondPlaceholder = list
      ? ""
      : "Enter card description";


    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";

    const buttonTitle = list ? "Add List" : "Add Card";


    return (
      <Modal show={this.openForm}
        onHide={this.closeForm}
      >
        <Modal.Header closeButton>
          <Modal.Title>{list ? "Add another list" : "Add another card"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
         <Form>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control required type="text" maxLength="20" placeholder={placeholder} value={this.state.text}
                        onChange={this.handleChange('text')}
                      />
                    </Form.Group>
                 
                
                  <div className={(buttonTitle === "Add Card") ? null : "ghost"}>

                    <Form.Group>
                      <Form.Label>Description input</Form.Label>

                      <Form.Control  as="textarea" rows="3" maxLength="200" value={this.state.title} onChange={this.handleChange('title')} />
                   </Form.Group>
                   <Form.Group>
                      <Form.Label>Select priority</Form.Label>
                        <Form.Control as="select" defaultValue='success' onChange={this.handleChangePriority}>
                          <option></option>
                          <option value={'danger'}>High</option>
                          <option value={'warning'}>Medium</option>
                          <option value={'success'}>Low</option>

                        </Form.Control>
                  </Form.Group>

                  </div>
                  </Form>
                  </Modal.Body>
              <Modal.Footer>
              <div className="buttonContainer">
                <Button style={{ color: 'white', background: '#5aac44' }}
                  onMouseDown={list ? this.handleAddList : this.handleAddCard}
                  variant="contained"
                  children={buttonTitle}
                />
              </div>
          
              </Modal.Footer> 
        
      </Modal>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

export default connect()(CreateCardForm);



