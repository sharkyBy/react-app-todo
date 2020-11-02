import React from 'react';
import "./TodoListItem.css";




export default class TodoListItem extends React.Component {
//после того как state установлен изменять state на прямую нельзя. Для этого использовать метод setState.
  state = {
    done:false,
    important:false
  }

    onLabelClick = () => {
      //Разные методы записи. В этом случае деструктурируем state и вытаскиваем значение поля done, которое меняем
      //на противоположное
      this.setState( ( {done} ) => {
        return {
          done:!done 
        }
      })
    };
 
    onMarkImportant = () => {
      //Разные методы записи. В этом случае принимаем текущий state и затем возвращаем противоположное значение
      this.setState( (state) => {
        return {
          important:!state.important
        };
      });
    }

  render() {
    // Деструктурируем пропсы и вытягиваем сразу то что нужно, т.е. свойство label
    const {label, onDeleted} = this.props;
    const {done, important} = this.state;

    let classNames = "todo-list-item";
    done ? classNames += ' done': 
    important ? classNames += " important":classNames = 'todo-list-item';
    // if(done) {
    //   classNames += ' done'
    // };


     

  
  return (
    <span className={classNames}>
      <span 
        className="todo-list-item-label"  
        
        onClick={this.onLabelClick}> 
        {label} 
      </span>

      <button type="button"
            className="btn btn-outline-success btn-sm float-right"
            onClick={this.onMarkImportant}>
         <i className="fa fa-exclamation" />
      </button>

      <button type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}>
        <i className="fa fa-trash-o" />
      </button>
    </span>        
)

};
}



