import { useState } from "react";
import { Form } from "react-bootstrap";

const Header = (props)=>{
    let [todo,setTodo]=useState('');
    let handleButton = (event)=>{
        let clone = event.target.value;
            setTodo(clone);
    }
    let handleKeyDown=(event)=>{
        if(event.keyCode === 13 && todo!==''){
                setTodo('');
                props.addTodo(todo);
        }
    }
    return(
        <>
            <h1>To do</h1> 
            <Form.Control className="font-web" placeholder="What do you need to do?" onKeyDown={(event)=>{handleKeyDown(event)}} onChange={(event)=>{handleButton(event)}} value={todo||''}></Form.Control>
        </>
    )
}

export default Header;