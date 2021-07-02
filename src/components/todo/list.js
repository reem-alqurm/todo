import React from 'react';
import {useContext} from 'react';
import { ListGroup, Toast, Badge } from 'react-bootstrap';
import {SettingContext} from '../context/setting'


const TodoList = (props) => {

const settingContext = useContext(SettingContext)


  return (
    <ListGroup>
      {settingContext.items
        .slice(settingContext.offset, settingContext.offset + 3)
				.map((item) => (
        <Toast
          className={`complete-${item.complete.toString()}`}
          key={item._id}
          onClose={() => props.handleDelete(item._id ,'delete')}
          >
         
          <Toast.Header  >
            <Badge style ={{padding:'8px' , cursor:'pointer'}} pill variant={item.complete ? "danger" : "success"}
            onClick={() => props.handleComplete(item._id ,'put')}>{item.complete ? "Complete" : "Pending..."}</Badge>{" "}
            <strong className="mr-auto" style={{marginLeft : '20px'}}>{item.assignee}</strong>
          </Toast.Header>
          <Toast.Body  onClick={() => props.handleComplete(item._id ,'put')}>
            {item.text}
            <div class="difficultly" style={{float:'right' , marginTop : '30px' , marginBottom : '10px'}}> Difficulty : {item.difficulty}</div>
          </Toast.Body>
        </Toast>
      ))}
    </ListGroup>
  );
}

export default TodoList;