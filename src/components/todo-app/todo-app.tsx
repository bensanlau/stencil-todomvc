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
  @State() hasCompleted: boolean;

  componentWillLoad() {
    const saved = localStorage.getItem('todos-stencil');
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }

  componentDidRender() {
    const deleteBtns = document.querySelectorAll('.destroy');
    deleteBtns.forEach((btn) => btn.addEventListener('click', (event) => this.deleteItem(event)));
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
    this.updateLocalStorage();
  }

  deleteItem(event) {
    const idToDelete = event.srcElement.parentElement.dataset.id;
    this.items = this.items.filter((item) => item.id !== idToDelete);
    this.updateLocalStorage();
  }

  checkItem(id) {
    if (typeof id === 'object') {
      id = id.parentElement.dataset.id;
    }
    const itemToCheck = this.items.find((item) => item.id === id);
    itemToCheck.completed = !itemToCheck.completed;
    this.items = [...this.items]; // REally??
    this.hasCompleted = this.items.some((item) => item.completed);
    this.updateLocalStorage();
  }

  checkAll() {
    this.items.forEach((item) => {
      this.checkItem(item.id);
    });
  }

  updateLocalStorage() {
    localStorage.setItem('todos-stencil', JSON.stringify(this.items));
  }

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

        <section style={{display: this.items.length > 0 ? 'block' : 'none' }} class="main">
          <input id="toggle-all" class="toggle-all" type="checkbox" onChange={() => this.checkAll()} />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul class="todo-list">
            {this.items.map((item) => 
              <li data-id={item.id} class={item.completed ? 'completed' : null}>
                <input class="toggle" type="checkbox"
                  onChange={(event) => this.checkItem(event.target)}
                  checked={item.completed}
                />
                <label>{item.title}</label>
                <button class="destroy"></button>
              </li>
            )}
          </ul>
          <footer class="footer">
            <span class="todo-count"></span>
            <ul class="filters">
              <li>
                <a href="#/" class="selected">All</a>
              </li>
              <li>
                <a href="#/active">Active</a>
              </li>
              <li>
                <a href="#/completed">Completed</a>
              </li>
            </ul>
            <button class="clear-completed" style={{ display: this.hasCompleted ? 'block' : 'none'}}>Clear completed</button>
          </footer>
        </section>
      </section>
    );
  }

}
