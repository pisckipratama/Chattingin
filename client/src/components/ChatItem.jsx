import React from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatItem.css';

function ChatItem(props) {
  let { name, chat, id } = props.chatData;
  return (
    <div className="timeline">
      <div className="container-box right-position text-left">
        <div className="content">
          <div className="d-flex justify-content-end btn text-muted d-flex"
            onClick={() => props.deleteChat(id)}>
            delete
          </div>
          <div className="d-flex justify-content-start">
            <h4>{name}</h4>
          </div>
          <div className="d-flex justify-content-between">
            <ReactMarkdown source={chat} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatItem;