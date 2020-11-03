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
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lanch'),
    ]
    
  };

  createTodoItem (label) {
      //Генерируем id для нового элемента
    return {
      label,
      important: false,
      done:false,
      id: this.maxId++
    }
    }

    
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
        todoData:newArray,
        
      }

    })
  }

  addItem = (text) => {
    //Генерируем id для нового элемента
    const newItem = this.createTodoItem(text)

    //Добавление нового объекта в массив объектов
    this.setState(({todoData}) => {

      const newArr = [
        ...todoData, newItem
      ];

      return {
        todoData:newArr,
        
      };
    });

  }


  //
  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex( (el) => el.id === id );
    const oldItem = arr[idx];
      const newItem = {
        ...oldItem, 
        [propName]:!oldItem[propName]
      };

      const befor = arr.slice(0, idx); // создаст массив с индекса 0 до индекса удаляемого элемента
      const after = arr.slice(idx + 1); //создаст массив со следующего за удаляемым элементом до конца массива
     
      return [
        ...befor, newItem, ...after
      ]
        
  }
    
  
  

  onToggleImportant = (id) => {

    this.setState(({todoData}) => {
      
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
  });
}

  onToggleDone = (id) => {

    this.setState(({ todoData }) => {
     
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };     
      
    });
  }
    

  render() {

    const doneCount = this.state.todoData
                                .filter((el)=>el.done)
                                .length;
    const todoCount = this.state.todoData.length - doneCount;
        
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={this.state.todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddform onItemAdded={this.addItem}/>
      </div>
    );
  }
}
