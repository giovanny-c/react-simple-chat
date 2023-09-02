import React, { useState } from "react";

import io from "socket.io-client"

const socket = io("http://localhost:8080")
socket.on("connect", () => console.log("[IO] Connect => A new connection has been established."))

const Chat = () => {
    //variavel e função para atualiza-la
    const [message, updateMessage] = useState("")

    const [messages, updateMessages] = useState([])

    //vai previnir o form de enviar e vai limpar o valor
    //que tem como valor "message"
    const handleFormSubmit = event => {
        event.preventDefault()

        //se tiver algum caracter na stream que nao for " "
        if (message.trim()) {

            //pega as messages anteriores e junta com a nova para fazer o update
            //no messages.map
            updateMessages([...messages, {
                id: 1,
                message
            }])

            //vai limpar a variavel
            updateMessage("")
        }
    }

    //vai pegar o valor do input toda vez que for mudado
    const handleInputChange = event => updateMessage(event.target.value)

    return (
        <main className="container">

            <ul className="list">

                {messages.map(m => (
                    <li className="list__item list__item--mine">

                        <span
                            className="message message--mine"
                            key={m.id}
                        >
                            {m.message}
                        </span>

                    </li>
                ))}

            </ul>

            <form className="form" onSubmit={handleFormSubmit}>
                <input
                    className="form__field"
                    onChange={handleInputChange}
                    placeholder="Type a new message here"
                    type="text"
                    value={message}
                />
            </form>
        </main>
    )
}

export default Chat