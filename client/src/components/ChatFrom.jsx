import React from 'react';
import './ChatForm.css'

class ChatFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', chat: '' }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReturnKey = this.handleReturnKey.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let name = this.state.name.trim();
    let chat = this.state.chat.trim();
    this.props.addChat(name, chat);
    this.setState({ name: '', chat: '' })
  }

  handleReturnKey(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      let button = document.getElementById('submitBtn');
      button.click();
    }
  }

  render() {
    return (

        <div className="container-form right-position text-center h4">
          <div className="content-form">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" name="name" id="Name" className="form-control"
                  placeholder="Enter your name" required={true} autoFocus={true}
                  onChange={this.handleChange} value={this.state.name}
                  onKeyUp={this.handleReturnKey} />
              </div>
              <div className="form-group">
                <textarea id="Chat" name="chat" className="form-control" rows="3"
                  placeholder="Write your message here"
                  required={true} autoFocus={true}
                  onChange={this.handleChange} value={this.state.chat}
                  onKeyUp={this.handleReturnKey}></textarea>
              </div>
              <button id="submitBtn" type="submit" className="btn btn-info">Post</button>
            </form>
          </div>
        </div>

    )
  }
}

export default ChatFrom;