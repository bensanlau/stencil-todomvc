import { Component, h, State } from '@stencil/core';
@Component({
  tag: 'todo-app',
  styleUrl: 'todo-app.css',
})

export class TodoApp {
  @State() filter: string;

  componentWillLoad() {
    this.applyFilterByHash();
    
    window.addEventListener('hashchange', () => {
      this.applyFilterByHash();
    });
  }

  applyFilterByHash() {
    this.filter = window.location.hash.split('#/')[1];
  }

  render() {
    return (
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <todo-input />
        </header>

        <todo-list filter={this.filter} />
      </section>

    );
  }

}
