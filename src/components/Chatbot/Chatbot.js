import React, { useEffect, useState } from 'react';
import AWS, { LexRuntime } from 'aws-sdk';
import classNames from 'classnames';
import Button from 'components/Button';
import Title from 'components/Title';
import './Chatbot.scss';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const noInput = input.length < 1;
    const allWhitespace = input.length > 0 && !input.trim();
    const {
        REACT_APP_LEX_ACCESS,
        REACT_APP_LEX_ALIAS,
        REACT_APP_LEX_BOT,
        REACT_APP_LEX_SECRET,
        REACT_APP_LEX_USER,
        REACT_APP_REGION,
    } = process.env;
    AWS.config.update({
        accessKeyId: REACT_APP_LEX_ACCESS,
        region: REACT_APP_REGION,
        secretAccessKey: REACT_APP_LEX_SECRET,
    });
    const lex = new LexRuntime();

    const processInput = async () => {
        await lex.postText({
            botAlias: REACT_APP_LEX_ALIAS,
            botName: REACT_APP_LEX_BOT,
            inputText: input,
            userId: REACT_APP_LEX_USER,
        }, (error, data) => {
            if (data.dialogState === 'ReadyForFulfillment') {
                setMessages([...messages, { from: 'user', input }, { from: 'bot', input: `Your ${data.slots.AppointmentType} appointment has been scheduled on ${data.slots.Date} at ${data.slots.Time}.` }]);
            } else {
                setMessages([...messages, { from: 'user', input }, { from: 'bot', input: data.message }]);
            }
        });
        setInput('');
    };

    useEffect(() => {
        const textInput = document.getElementById('chatbot-control-message-input');
        const sendButton = document.getElementById('chatbot-control-send-button');
        textInput.addEventListener('keyup', event => {
            if (event.key === 'Enter') sendButton.click();
        });
    }, []);

    useEffect(() => {
        const chatbotHistory = document.getElementById('chatbot-history');
        chatbotHistory.scrollTop = chatbotHistory.scrollHeight;
    }, [messages]);

    return (
        <div className="chatbot">
            <p className="chatbot-description">
                This is an <strong>Amazon Lex</strong> chatbot that schedules appointments. The chatbot uses <strong>machine learning</strong> to process user input and fulfill three "slots"—appointment type, date, and time—before confirming an appointment. Feel free to chat with it and see how it responds.
            </p>
            <Title title="Chatbot" />
            <div className="chatbot-frame">
                <div id="chatbot-history">
                    {messages.length === 0 && 'Try asking for an appointment!'}
                    {messages.length > 0 && messages.map(message => (
                        <div className={classNames('chatbot-history-message-container', {
                            'chatbot-history-message-container-bot': message.from === 'bot',
                            'chatbot-history-message-container-user': message.from === 'user',
                        })}>
                            <div className={classNames('chatbot-history-message', {
                                'chatbot-history-message-bot': message.from === 'bot',
                                'chatbot-history-message-user': message.from === 'user',
                            })}>
                                {message.input}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="chatbot-control">
                    <div className="chatbot-control-message">
                        <input
                            id="chatbot-control-message-input"
                            onChange={event => setInput(event.target.value)}
                            placeholder="Type a message..."
                            value={input}
                        />
                    </div>
                    <div className="chatbot-control-send">
                        <Button
                            id="chatbot-control-send-button"
                            label="Send"
                            onClick={() => processInput()}
                            variant="primary"
                            {...{...((noInput || allWhitespace) && { className: 'disabled' }), disabled: noInput || allWhitespace }}
                        />
                    </div>
                    <div className="chatbot-control-reset">
                        <Button className="chatbot-control-reset-button" label="Reset" onClick={() => {
                            setInput('');
                            setMessages([]);
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;