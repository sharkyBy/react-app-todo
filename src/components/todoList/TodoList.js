import React from 'react';
import TodoListItem from "../todoListItem/TodoListItem";
import './TodoList.css'

//Если передается атрибут без значения, то по умолчанию значение присваивается true
//т.е. атрибут important  эквивалентен записи атрибута important = {true}

//При помощи spread оператора можно из объекта вытащить одноименные поля, т.е. поля label и important
//Итак, запись {...item} равносильна записи label=item.label, important=item,important

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
  const elements = todos.map((item) => {
    //Деструктурируем объект массива объектов и вытаскиваем свойство id. Все оставшиеся параметры
    //объекта собираем в объект ...itemProps. Таким образом в пропсы компоненты TodoListItem попадут только
    //поля и значения полей которые остались от деструктуризации объекта item.
    const {id, ...itemProps} = item;
    return (
      <li key={id} className="list-group-item">
        <TodoListItem 
          {...itemProps}
          onDeleted={ () => onDeleted(id) }
          onToggleImportant={()=>onToggleImportant(id)}
          onToggleDone={()=>onToggleDone(id)} />
      </li>
    );
  });

  return (
    <ol className="list-group todo-list">
      {elements}
    </ol>
  );
};

export default TodoList;