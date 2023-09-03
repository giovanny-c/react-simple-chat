import React, { useEffect, useState } from "react";

import io from "socket.io-client"

import { v4 as uuidV4 } from "uuid"

const myId = uuidV4()

const socket = io("http://localhost:8080")
socket.on("connect", () => console.log("[IO] Connect => A new connection has been established."))

const Chat = () => {
    //variavel e função para atualiza-la
    const [message, updateMessage] = useState("")

    const [messages, updateMessages] = useState([])

    //um react-hook
    useEffect(() => {//funçao para executar quando a propriedade mudar

        //pega as todas as mensagens e junta com a msg nova
        const handleNewMessage = newMessage => updateMessages([...messages, newMessage])

        //vai ouvir o evento
        socket.on("chat.message", handleNewMessage)//executando a funçao

        //para parar de ouvir o evento
        return () => socket.off("chat.message", handleNewMessage)

    }, [messages])
    //[] no array, propriedades para ouvir a mudança, se nao houver nenhuma, a função sera disparada apenas uma vez
    //


    //vai previnir o form de enviar e vai limpar o valor
    //que tem como valor "message"
    const handleFormSubmit = event => {
        event.preventDefault()

        //se tiver algum caracter na stream que nao for " "
        if (message.trim()) {

            //pega as messages anteriores e junta com a nova para fazer o update
            //no messages.map
            socket.emit("chat.message", {
                id: myId,// vai gerar ids aleatorios para para o user
                message
            })

            //vai limpar a variavel
            updateMessage("")
        }
    }

    //vai pegar o valor do input toda vez que for mudado
    const handleInputChange = event => updateMessage(event.target.value)

    return (
        <main className="container">

            <ul className="list">

                {messages.map((m, index) => (

                    <li
                        className={`list__item list__item--${m.id === myId ? "mine" : "other"}`}
                        key={index}
                    >

                        <span className={`message message--${m.id === myId ? "mine" : "other"}`}>
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