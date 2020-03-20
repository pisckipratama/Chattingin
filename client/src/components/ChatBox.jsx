import React from 'react';
import ChatForm from './ChatFrom';
import ChatItem from './ChatItem';
import './ChatItem.css';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');
const API_URL = 'http://localhost:3001/api/chats';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.loadChat()

    socket.on('load chat', (newData) => {
      this.setState(state => ({ data: [...state.data, newData] }));
    })

    socket.on('delete chat', (id) => {
      this.setState(state => ({
        data: state.data.filter(chatData => chatData.id !== id)
      }))
    })
  }

  loadChat = () => {
    return axios.get(API_URL)
    .then((response) => {
      if (response.data.error) console.log(response.data.message)
      let chatData = response.data.chatData.map(chat => {
        return { ...chat, status: true };
      })
      this.setState({ data: chatData })
    }).catch((err) => {
      console.error(err);
    });
  }

  deleteChat = (id) => {
    this.setState(state => ({
      data: state.data.filter(chatData => chatData.id !== id)
    }));
    axios.delete(API_URL + `/${id}`)
    .then(() => {
      socket.emit('delete chat', id);
    }).catch((err) => {
      console.error(err)
    });
  }

  addChat = (name, chat, deletedId) => {
    if (chat.length > 0) {
      let id = Date.now();
      this.setState(state => {
        let chatData = state.data.filter(chatData => chatData.id !== deletedId);
        return { data: [...chatData, { id, name, chat, status: true}], typer: '' }
      });
      axios.post(API_URL, { id, name, chat })
      .then((response) => {
        let chatData = { ...response.data.chatAdded, status: true }
        socket.emit('add chat', chatData);
        socket.emit('stop typing');
      }).catch((err) => {
        this.setState(state => ({
          data: state.data.map(chatData => {
            if(chatData.id === id) chatData.status = false;
            return chatData;
          })
        }))
      });
    }
  }

  render() {
    return (
      <div>
        <div className="card">
          <h2 className="card-header text-center">React Chat App</h2>
        </div>
        <div className="scrollable" style={{ maxHeight: '67vh', overflowY: 'auto' }}>
        {this.state.data.map((chatData, index) => (
          <ChatItem key={chatData.id} chatData={chatData} deleteChat={this.deleteChat} />
          ))}
        </div>
        <ChatForm addChat={this.addChat} style={{ overflowY: 'auto' }}></ChatForm>
      </div>
    )
  }
}

export default ChatBox;