import { Component, h, State } from '@stencil/core';
import todoStore from '../../utils/store';

@Component({
  tag: 'todo-footer',
  styleUrl: 'todo-footer.css',
})
export class TodoFooter {
  @State() todosCount: number;
  @State() hasCompletedItems: boolean;

  componentWillLoad() {
    todoStore.onChange('items', () => {
      this.checkCompletedItems();
      this.getItemCount();
    });
  }

  componentWillRender() {
    this.checkCompletedItems();
    this.getItemCount();
  }
  
  checkCompletedItems() {
    this.hasCompletedItems = todoStore.get('items').some(item => item.completed);
  }

  getItemCount() {
    this.todosCount = todoStore.get('items').filter(item => !item.completed).length;
  }
  
  clearCompleted() {
    const items = todoStore.get('items').filter(item => !item.completed);
    todoStore.set('items', items);
  }

  handleFilter(event: any) {
    document.querySelectorAll('.filters a').forEach(filter => filter.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    todoStore.set('filter', event.currentTarget.textContent.toLowerCase());
  }

  render() {
    return (
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
        <button class="clear-completed" style={{ display: this.hasCompletedItems ? 'block' : 'none'}}
          onClick={() => this.clearCompleted()}>Clear completed</button>
      </footer>
    );
  }

}
