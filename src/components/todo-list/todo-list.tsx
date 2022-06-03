import { Component, h, State } from '@stencil/core';
import todoStore from '../../utils/store';

type Item = {
  id: string,
  title: string,
  completed: boolean,
}

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css',
})
export class TodoList {
  @State() items: any[];
  @State() filter: string;
  
  componentWillLoad() {
    const storage = JSON.parse(localStorage.getItem('todos-stencil')) || [];
    todoStore.set('items', storage);
    this.items = todoStore.get('items');

    todoStore.onChange('items', () => {
      this.items = todoStore.get('items');
      this.updateLocalStorage();
    });

    todoStore.onChange('newItem', title => this.addItem(title));
    todoStore.onChange('filter', filter => this.filter = filter);
  }

  componentWillRender() {
    if (this.filter === 'active') {
      this.items = todoStore.get('items').filter((item) => !item.completed);
    } else if (this.filter === 'completed') {
      this.items = todoStore.get('items').filter((item) => item.completed);
    } else {
      this.items = todoStore.get('items');
    }
  }

  addItem(title: string) {
    const newTodo: Item = {
      'id': (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, ''), // https://bit.ly/3PEcZFs
      'title': title,
      'completed': false,
    }
    todoStore.set('items', [...todoStore.get('items'), newTodo]);
    this.updateLocalStorage(); 
  }

  updateLocalStorage() {
    localStorage.setItem('todos-stencil', JSON.stringify(todoStore.get('items')));
  }

  render() {
    return (
      <section style={{ display: todoStore.get('items').length > 0 ? 'block' : 'none' }} class="main">
        <todo-toggle allChecked={this.items.every(item => item.completed)} />

        <ul class="todo-list">
          {this.items.map((item) =>
            <todo-item itemId={item.id} completed={item.completed} itemTitle={item.title} />
          )}
        </ul>
        <todo-footer />
      </section>
    );
  }

}
