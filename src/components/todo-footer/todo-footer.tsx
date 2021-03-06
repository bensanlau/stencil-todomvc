import { Component, h, Prop, State } from '@stencil/core';
import todoStore from '../../utils/store';

@Component({
  tag: 'todo-footer',
  styleUrl: 'todo-footer.css',
})
export class TodoFooter {
  @State() todosCount: number;
  @State() hasCompletedItems: boolean;
  @Prop() filter: string;

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

  render() {
    return (
      <footer class="footer">
        <span class="todo-count">{this.todosCount} {this.todosCount === 1 ? 'item' : 'items'} left</span>
        <ul class="filters">
          <li><a href="#/" class={{ 'selected': this.filter === '' }}>All</a></li>
          <li><a href="#/active" class={{ 'selected':this.filter === 'active' }}>Active</a></li>
          <li><a href="#/completed" class={{ 'selected': this.filter === 'completed' }}>Completed</a></li>
        </ul>
        <button class="clear-completed" style={{ display: this.hasCompletedItems ? 'block' : 'none'}}
          onClick={() => this.clearCompleted()}>Clear completed</button>
      </footer>
    );
  }

}
