import React, { Component } from "react";
import TodoList from "../todoList/TodoList";
import SearchPanel from "../searchPanel/SearchPanel";
import AppHeader from "../appHeader/AppHeader";
import ItemStatusFilter from "../itemStatusFilter/ItemStatusFilter";
import ItemAddform from "../itemAddForm/ItemAddForm";

import "./App.css";


export default class App extends Component {

  maxId=100;

  state = {
    todoData: [
      { label: "Drink Coffe", important: false, id: 1 },
      { label: "Make Awesome App", important: true, id: 2 },
      { label: "Have a lanch", important: false, id: 3 },
    ],
  };

  deleteItem = (id) => {
    this.setState( ({todoData}) => {
      const idx = todoData.findIndex( (el) => el.id === id );
      
      
      //Напрямую state изменять нельзя. При вызове функции setState получим объект, 
      //в котором находится старый  state, из которого вытаскиваем массив todoData
      //Поэтому напрямую изменить массив todoData нельзя. Для этого воспользуемся методами массива,
      //создающими новый массив, который содержит все элементы старого массива, кроме элемента, который
      //надо удалить
      //Исходный массив [a, b, c, d, e]
      //Конечный массив [a, b,    d, e]
      
      const befor = todoData.slice(0, idx); // создаст массив с индекса 0 до индекса удаляемого элемента
      const after = todoData.slice(idx + 1); //создаст массив со следующего за удаляемым элементом до конца массива
      const newArray = [...befor, ...after];


      return {
        todoData:newArray
      }

    })
  }

  addItem = (text) => {
    //Генерируем id для нового элемента
    const newItem = {
      label: text,
      important: false,
      id: this.maxId++
    }

    //Добавление нового объекта в массив объектов
    this.setState(({todoData}) => {

      const newArr = [
        ...todoData, newItem
      ];

      return {
        todoData:newArr
      };
    });

  }

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={this.state.todoData}
          onDeleted={this.deleteItem}
        />
        <ItemAddform onItemAdded={this.addItem}/>
      </div>
    );
  }
}
