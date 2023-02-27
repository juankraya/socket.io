import { useEffect, useState } from 'react'
import io from 'socket.io-client'


let socket;

export default function Home() {
  const [input, setInput] = useState('')
  const [mensajes, setMensajes] = useState([])

  useEffect(() => socketInitializer(), [socket])

  const socketInitializer =  () => {
    
   
    socket = io()

    socket.on('update-input', (msg) => {
      setMensajes([...mensajes, {body: msg}])
    })
  }

  const onChangeHandler = (e) => {
    e.preventDefault()
    socket.emit('input-change', input)
    setInput("")
  }

console.log(mensajes)

  return (
    <div>
     <form onSubmit={onChangeHandler}>
       <input onChange={(e)=>{ setInput(e.target.value) }}value={input} type="text"/>
       <input type="submit" value="enviar"/>
     </form>
     {mensajes.map( (elem, index) =>  
        (<div key={index}>
          <h3>{elem.body}</h3>
          <h3>{elem.from}</h3>
          </div>)
    )}
     
    </div>

)
}

