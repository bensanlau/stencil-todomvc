import { Component, h, State } from '@stencil/core';

type Item = {
  id: string,
  title: string,
  completed: boolean,
}

@Component({
  tag: 'todo-app',
  styleUrl: 'todo-app.css',
})

export class TodoApp {
  @State() value: string;
  @State() items: Item[] = [];
  @State() displayingItems: Item[] = [];
  @State() filter: string;
  @State() hasCompleted: boolean;
  @State() todosCount: number;

  componentWillLoad() {
    const saved = localStorage.getItem('todos-stencil');
    if (saved) {
      this.items = JSON.parse(saved);
    }
    this.displayingItems = this.items;
  }

  componentWillRender() {
    this.checkForCompletedItems();
    this.getTodoCount();
    switch(this.filter) {
      case 'active':
        this.displayingItems = this.items.filter((item) => !item.completed);
        break;
      case 'completed':
        this.displayingItems = this.items.filter((item) => item.completed);
        break;
      default:
        this.displayingItems = this.items;
        break;
    }
  }

  checkForCompletedItems() {
    this.hasCompleted = this.items.some((item) => item.completed);
  }

  handleChange(event) {
    this.value= event.target.value;
  }

  handleKeyUp(event) {
    if (event.code === 'Enter' && this.value) {
      this.addItem();

      // reset input
      this.value = null;
      event.srcElement.value = ''; // Surely a better way to target input?
    }
  }

  addItem() {
    const newItem: Item = {
      'id': (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, ''), // https://bit.ly/3PEcZFs
      'title': this.value,
      'completed': false,
    }
    this.items = [...this.items, newItem];
    this.update();
  }

  deleteItem(event) {
    const idToDelete = event.srcElement.parentElement.parentElement.dataset.id;
    this.items = this.items.filter((item) => item.id !== idToDelete);
    this.update();
  }

  checkItem(id, checkAll = false) {
    if (typeof id === 'object') {
      id = id.parentElement.parentElement.dataset.id;
    }
    const itemToCheck = this.items.find((item) => item.id === id);
    itemToCheck.completed = checkAll ? true : !itemToCheck.completed;
    this.items = [...this.items];
    this.hasCompleted = this.items.some((item) => item.completed);
    this.update();
  }

  checkAll() {
    const isAllCompleted = this.items.every((item) => item.completed);
    this.items.forEach((item) => {
      this.checkItem(item.id, !isAllCompleted);
    });
  }

  clearCompleted() {
    this.items = this.items.filter((item) => !item.completed);
    this.checkForCompletedItems();
    this.update();
  }

  handleFilter(event) {
    // Reset filters
    document.querySelectorAll('.filters li a').forEach((link) => {
      link.classList.remove('selected');
    });

    this.filter = event.srcElement.text.toLowerCase();
    event.srcElement.classList.add('selected');
  }

  getTodoCount() {
    this.todosCount = this.items.filter((item) => !item.completed).length;
  }

  update() {
    this.getTodoCount();
    localStorage.setItem('todos-stencil', JSON.stringify(this.items));
  }

  displayCount() {
    return `${this.todosCount} ${this.todosCount === 1 ? 'item' : 'items'} left`;
  }

  // saveEdit(item, value) {
  //   console.log(item, value);
  //   const idToEdit = item.dataset.id;
  //   const itemToEdit = this.items.find((item) => item.id === idToEdit);
  //   itemToEdit.title = value;
  //   this.update();

  //   // document.querySelector('.new-todo').focus();
  // }

  // makeEdit(item) {
  //   const view =  item.querySelector('.view');
  //   const edit = item.querySelector('.edit');

  //   view.querySelector('input').value = edit.value;
  //   view.querySelector('label').textContent = edit.value;
  //   this.saveEdit(item, edit.value);
  //   view.parentElement.classList.remove('editing');
  //   if (item.querySelector('.edit')) {
  //     item.querySelector('.edit').remove();
  //   }
  // }

  // editItem(event) {
  //   const item = event.currentTarget;
  //   item.classList.add('editing');

  //   const editInput = document.createElement('input');
  //   editInput.classList.add('edit');
  //   editInput.value = event.srcElement.textContent;
  //   editInput.onkeyup = (e) => {
  //     if (e.key.toLowerCase() === 'enter') {
  //       this.makeEdit(item);
  //     }
  //   };
  //   editInput.onblur = () => this.makeEdit(item);
  //   item.appendChild(editInput);
  //   editInput.focus();
  // }

  render() {
    return (
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <input
            id="new-todo" class="new-todo" placeholder="What needs to be done?" autofocus
            onKeyUp={(event) => this.handleKeyUp(event)}
            onInput={(event) => this.handleChange(event)}
          />
        </header>

        <section style={{display: this.items.length > 0 ? 'block' : 'none'}} class="main">
          <input id="toggle-all" class="toggle-all" type="checkbox" onChange={() => this.checkAll()} />
          <label htmlFor="toggle-all" style={{visibility: this.displayingItems.length > 0 ? 'visible' : 'hidden'}}>Mark all as complete</label>

          <ul class="todo-list">
            {this.displayingItems.map((item) =>
              <li data-id={item.id} class={item.completed ? 'completed' : null}>
                <div class="view">
                  <input class="toggle" type="checkbox"
                    onChange={(event) => this.checkItem(event.target)}
                    checked={item.completed}
                    />
                  <label>{item.title}</label>
                  <button onClick={(event) => this.deleteItem(event)} class="destroy"></button>
                </div>
              </li>
            )}
          </ul>
          <footer class="footer">
            <span class="todo-count">{this.todosCount} {this.todosCount === 1 ? 'item' : 'items'} left</span>
            <ul class="filters">
              <li>
                <a onClick={(event) => this.handleFilter(event)} href="#/" class="selected">All</a>
              </li>
              <li>
                <a onClick={(event) => this.handleFilter(event)} href="#/active">Active</a>
              </li>
              <li>
                <a onClick={(event) => this.handleFilter(event)} href="#/completed">Completed</a>
              </li>
            </ul>
            <button class="clear-completed" onClick={() => this.clearCompleted()} style={{ display: this.hasCompleted ? 'block' : 'none'}}>Clear completed</button>
          </footer>
        </section>
      </section>
    );
  }

}
