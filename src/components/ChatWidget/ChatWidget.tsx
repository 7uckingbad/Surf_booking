import { useEffect, useState, useRef } from "react";
import styles from "./ChatWidget.module.scss";
import chatImg from "../../assets/ChatWidget/Chat.svg";
import chatWaves from "../../assets/ChatWidget/hugeicons_tsunami.svg";
import { Client } from "@stomp/stompjs";
import chatMessage from "../../assets/ChatWidget/chatMessage.svg";

interface ServerMessage {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

// const BASE_URL = "http://localhost:8088/api";
// переключить когда Макс задеплоит ветку sbl-55/implement-chat-api на Render
const BASE_URL = "https://backend-nvbr.onrender.com/api";

// const WS_URL = "ws://localhost:8088/api/ws";
//переключить когда Макс задеплоит ветку sbl-55/implement-chat-api на Render
const WS_URL = "wss://backend-nvbr.onrender.com/api/ws";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ServerMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState(
    () => localStorage.getItem("chatUsername") ?? "",
  );
  const [nameInput, setNameInput] = useState("");
  const clientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetch(`${BASE_URL}/messages?page=0&size=20`);
        const data = await response.json();
        setMessages(data.content ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    const client = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      client.subscribe("/topic/messages", (message) => {
        const newMessage: ServerMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, newMessage]);
      });
    };

    client.onStompError = (frame) => {
      console.error("STOMP error:", frame);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  const handleSetUsername = () => {
    if (!nameInput.trim()) return;
    localStorage.setItem("chatUsername", nameInput.trim());
    setUsername(nameInput.trim());
  };

  const handleSend = () => {
    if (!inputValue.trim() || !clientRef.current?.connected) return;

    clientRef.current.publish({
      destination: "/app/messages",
      body: JSON.stringify({
        sender: username,
        content: inputValue,
      }),
    });

    setInputValue("");
  };

  return (
    <div className={styles.chatWidget}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
          <div className={styles.chatHeader}>
            <div>
              <h3 className={styles.chatTitle}>
                SwellChat
                <img src={chatWaves} alt="" />
              </h3>
            </div>
          </div>

          {!username ? (
            <div className={styles.nameForm}>
              <p className={styles.enterName}>
                Enter your name to join the chat:
              </p>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSetUsername()}
                placeholder="Your name"
                className={styles.chatInput}
                maxLength={255}
              />
              <button onClick={handleSetUsername} className={styles.joinButton}>
                Join
              </button>
            </div>
          ) : (
            <>
              <div className={styles.messagesList}>
                {messages.map((msg) => {
                  const isMe = msg.sender === username;
                  return (
                    <div
                      key={msg.id}
                      className={`${styles.messageRow} ${
                        isMe ? styles.messageRowMe : ""
                      }`}
                    >
                      <div className={styles.avatar}>
                        {msg.sender.charAt(0).toUpperCase()}
                      </div>
                      <div
                        className={
                          isMe ? styles.messageBubbleMe : styles.messageBubble
                        }
                      >
                        <span className={styles.messageUsername}>
                          {msg.sender}
                        </span>
                        <p className={styles.messageText}>{msg.content}</p>
                        <span className={styles.messageTime}>
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <div className={styles.inputRow}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className={styles.chatInput}
                  maxLength={255}
                />
                <button
                  onClick={handleSend}
                  className={styles.sendButtonWrapper}
                >
                  <img src={chatMessage} alt="" className={styles.sendButton} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {!isOpen && (
        <button
          className={styles.triggerButton}
          onClick={() => setIsOpen(true)}
        >
          <img src={chatImg} alt="" />
        </button>
      )}
    </div>
  );
};
