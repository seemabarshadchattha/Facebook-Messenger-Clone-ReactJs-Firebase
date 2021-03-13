import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import "./App.css";
import Message from "./Message";
import { db } from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import logo from "./fblogo.png";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    // setMessages([...messages, { username: username, message: input }]);
    db.collection("messages").add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="App">
      <img src={logo} className="logo" />
      <h1>Facebook Messenger Clone 🚀 </h1>
      <h2>Welcome {username}</h2>
      <form className="app_form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter message ..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconButton"
            type="submit"
            disabled={!input}
            variant="contained"
            color="primary"
            onClick={(event) => sendMessage(event)}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
