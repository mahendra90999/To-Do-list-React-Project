import React, { useState , useEffect } from 'react'

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
  
    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };

const Todo = () => {

    const [inputdata,setinputdata] = useState("");

    const [items,setItems] = useState(getLocalData());

    const [isEditItem, setIsEditItem] = useState("");

    const [toggleButton, setToggleButton] = useState(false);

    // add items
    const addItem = () => {
        if(!inputdata){
            alert("plz fill the data");
        }
        else if(inputdata && toggleButton){
            setItems(
                items.map((curElem) => {
                    if(curElem.id ===  isEditItem){
                        return{...curElem, name: inputdata};
                    }
                    return curElem;
                })
            )
        setinputdata(" ");
        setIsEditItem(null);    
        setToggleButton(false);
        }
        else{
            const myNewInputData = {
                id : new Date().getTime().toString(),
                name: inputdata,
            };
            setItems([...items, myNewInputData]);
            setinputdata(" ");
        }
    }
    
    // edit item
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });

        setinputdata(item_todo_edited.name);
        setIsEditItem(index);    
        setToggleButton(true);
    }

    // delete items
    const deleteItem = (Index) => {
        const updatedItem = items.filter((curElem)=> {
            return curElem.id !== Index;
        });
        setItems(updatedItem);
    }
    
    // removeall the Element
    const removeall = () => {
        setItems([]);
    }

    // adding local storage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
      }, [items]); 



  return (
    <div>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src="./image/logo1.png" alt='logo'></img>
                    <figcaption>Add your list here✍</figcaption>
                </figure>
                <div className='addItems'>
                    <input type="text" placeholder='Add Items' className='form-control' value={inputdata} onChange={(event) => setinputdata(event.target.value)}></input>
                    {toggleButton ? <i className="far fa-edit add-btn " onClick={addItem}></i> : <i className="fa fa-plus add-btn " onClick={addItem}></i> }
                    
                </div>

                {/* show out items */}
                <div className='showItems'>
                    {items.map((curElem)=> {
                        return (
                            <div className='eachItem' key={curElem.id}>
                        <h3>{curElem.name}</h3>
                        <div className='todo-btn'>
                            <i className="far fa-edit add-btn " onClick={() => editItem(curElem.id) }></i>
                            <i className="far fa-trash-alt add-btn " onClick={() => deleteItem(curElem.id)}></i>
                        </div>
                    </div>
                        ) 
                    })}
                    
                </div>

                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text="Remove all" onClick={removeall}><span>Click here</span></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Todo