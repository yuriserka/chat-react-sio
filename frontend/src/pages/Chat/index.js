import queryString from 'query-string';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaAngleRight, FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { UserContext } from '../../contexts/user';
import styles from './chat.module.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';

const ENDPOINT = 'http://localhost:3131';

const Chat = ({ location }) => {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [actualRoom, setRoom] = useState('');
  const socket = useRef(io(ENDPOINT, {
    'force new connection': true,
    reconnectionAttempts: 'Infinity',
    timeout: 10000,
    transports: ['websocket', 'polling', 'flashsocket']
  }));

  const history = useHistory();
  const { user, logout } = useContext(UserContext);

  if (!user) {
    history.push('/');
  }

  useEffect(() => {
    const { room } = queryString.parse(location.search);
    setRoom(room);


  }, [location.search]);

  useEffect(() => {
    if (!user || !actualRoom) return;

    socket.current.emit('join', { username: user.username, room: actualRoom }, (error) => {
      if (error) {
        alert(error.message);
        history.push('/');
      }
    });
  }, [user, actualRoom, history]);

  useEffect(() => {
    socket.current.on('message', (incomingMessage) => {
      setAllMessages([...allMessages, incomingMessage]);
    });
  }, [allMessages]);

  function sendMessage(event) {
    event.preventDefault();
    if (message) {
      socket.current.emit('sendMessage', message, () => {
        setMessage('');
      });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles['chat-container']}>
        <div className={styles.chat}>
          <div className={styles['info-bar']}>
            <div className={styles['chat-info']}>
              <span className={styles['indicator online']}></span>
              <span> Chat {actualRoom} </span>
            </div>
            <Link to="/" onClick={logout}>
              <FaArrowLeft color="white" />
            </Link>
          </div>
          <ScrollToBottom>
            <div className={styles['messages-list']}>
              {
                allMessages.map((m, i) => {
                  const sent = m.username === user.username.trim().toLowerCase();

                  return (
                    <div
                      className={`${styles[sent ? 'sent' : 'received']} ${styles['message-container']}`}
                      key={i}
                    >
                      {!sent && <h3>{m.username}</h3>}
                      <span>{ReactEmoji.emojify(m.text)}</span>
                    </div>
                  );
                })
              }
            </div>
          </ScrollToBottom>
          <div className={styles['input-field']}>
            <input
              name="msg"
              value={message}
              placeholder="Say hi..."
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
              autoComplete="off"
            />
            <div className={styles['send-icon']} onClick={sendMessage}>
              <FaAngleRight color="black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
