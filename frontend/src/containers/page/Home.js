import React, { useEffect, useState } from "react";
import {Container} from 'react-bootstrap'
import Header from "./Header";
import { addTodoData,checkTodo,getData,deleteData } from "../../services/appServices";
let Home = () => {
    let [todolist,setTodolist]=useState([]);
    let [todolistActive,setTodolistActive]=useState([]);
    let [todolistCompleted,setTodolistCompleted]=useState([]);
    let [activePage,setPage]= useState('all');
    let addTodo = async (item)=>{
        // tao clone item moi
        let cloneItem={value:item,checked:false}
        // gui du lieu toi data
        let resData =await addTodoData(cloneItem)
        cloneItem._id=resData.value;
        let clone = [cloneItem,...todolist];
        setTodolist(clone);
        await refeshArr(clone)
    }
    let handleButton= async(event,index,item)=>{
        if (activePage==='all') {
            let clone=[...todolist];
            clone[index].checked=!clone[index].checked;
            setTodolist(clone)
            await checkTodo(clone[index]);
            await refeshArr(todolist)
        }
        else{
            let cloneIndex = todolist.indexOf(item);
            let clone=[...todolist];
            clone[cloneIndex].checked=!clone[cloneIndex].checked;
            setTodolist(clone)
            await checkTodo(clone[cloneIndex]);
            await refeshArr(todolist)
        }
    }
    let handleButtonDelete = async(index,data)=>{
        await deleteData(data);
        let clone = todolist.filter((item)=>{
            return item._id !== data._id
        })
        setTodolist(clone);
        await refeshArr(clone)
    }
    let refeshArr = (data)=>{
        let activeArr = data.filter((item)=>{
            return item.checked === false
        })
        let completeArr = data.filter((item)=>{
            return item.checked === true
        })
        setTodolistActive(activeArr);
        setTodolistCompleted(completeArr);
    }
    let handleButtonPage=(type)=>{
        setPage(type);
    }
    useEffect(()=>{
        const fetchData = async()=>{
            let data = await getData();
            setTodolist(data.value);
            let activeArr = data.value.filter((item)=>{
                return item.checked === false
            })
            let completeArr = data.value.filter((item)=>{
                return item.checked === true
            })
            setTodolistActive(activeArr);
            setTodolistCompleted(completeArr);
        }
        fetchData();
    },[])
    return (
        <Container>
            <div className ="container">
                <div className="todolist">
                    <Header addTodo={addTodo}></Header>                     
                <ul className="filters list-unstyled clearfix">
                    {activePage==='all' ?
                  (  todolist.length>0&&todolist.map((item,index)=>{
                        return(
                            <li key={index} className="row my-2">
                                <input type="checkbox" className="col-1 " checked={item.checked} onChange={event=>handleButton(event,index,item)}/>
                                <div  className="col-9" >
                                    {item.value}
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-danger" onClick={()=>handleButtonDelete(index,item)}>X</button>
                                </div>
                            </li>
                        )
                    }))
                : activePage ==='active'?
                (  todolistActive.length>0&&todolistActive.map((item,index)=>{
                    return(
                        <li key={index} className="row my-2">
                            <input type="checkbox" className="col-1 " checked={item.checked} onChange={event=>handleButton(event,index,item)}/>
                            <div  className="col-9" >
                                {item.value}
                            </div>
                            <div className="col-2">
                                <button className="btn btn-danger" onClick={()=>handleButtonDelete(index,item)}>X</button>
                            </div>
                        </li>
                    )
                }))
                :
                (  todolistCompleted.length>0&&todolistCompleted.map((item,index)=>{
                    return(
                        <li key={index} className="row my-2">
                            <input type="checkbox" className="col-1 " checked={item.checked} onChange={event=>handleButton(event,index,item)}/>
                            <div  className="col-9" >
                                {item.value}
                            </div>
                            <div className="col-2">
                                <button className="btn btn-danger" onClick={()=>handleButtonDelete(index,item)}>X</button>
                            </div>
                        </li>
                    )
                }))
                }
                </ul>
                <div className="row">
                    <div className=" col-2 mx-2">Tong {activePage==='all'?todolist.length:activePage==='active'?todolistActive.length:activePage==='complete'?todolistCompleted.length:0}</div>
                    <div className=" col-2 btn btn-primary mx-2" onClick={()=>handleButtonPage('all')}>all</div>
                    <div className=" col-3 btn btn-primary mx-2" onClick={()=>handleButtonPage('active')}>active</div>
                    <div className="col-3 btn btn-primary mx-2" onClick={()=>handleButtonPage('complete')}>complete</div>  
                </div>
                </div>
            </div>
        </Container>
       
    )
}

export default Home;
