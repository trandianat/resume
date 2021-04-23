import React, { useState } from 'react';
import AWS, { LexRuntime } from 'aws-sdk';
import classNames from 'classnames';
import Button from 'components/Button';
import Title from 'components/Title';
import './Chatbot.scss';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
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

    return (
        <div className="chatbot">
            <Title title="Chatbot" />
            <div className="chatbot-frame">
                <div className="chatbot-history">
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
                <div className="chatbot-input">
                    <input
                        className="chatbot-input-message"
                        onChange={event => setInput(event.target.value)}
                        placeholder="Type a message..."
                        value={input}
                    />
                    <Button
                        className={classNames('chatbot-send', { 'disabled': input.length < 1 })}
                        label="Send"
                        onClick={() => processInput()}
                        variant="primary"
                        {...{ disabled: input.length < 1 }}
                    />
                    <Button label="Reset" onClick={() => {
                        setInput('');
                        setMessages([]);
                    }} />
                </div>
            </div>
        </div>
    );
};

export default Chatbot;