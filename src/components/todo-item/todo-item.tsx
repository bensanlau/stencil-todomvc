import { Component, h, Prop } from '@stencil/core';
import todoStore from '../../utils/store';

@Component({
  tag: 'todo-item',
  styleUrl: 'todo-item.css',
  scoped: true,
})
export class TodoItem {
  @Prop() itemId: string;
  @Prop() completed: boolean;
  @Prop() itemTitle: string;

  checkItem(id: string) {
    const items = todoStore.get('items');
    const itemToCheck = items.find(item => item.id === id);
    itemToCheck.completed = !itemToCheck.completed;
    todoStore.set('items', []); // Needs forced reset to 'listen'
    todoStore.set('items', items);
  }

  deleteItem(id: string) {
    const items = todoStore.get('items').filter(item => item.id !== id);
    todoStore.set('items', items);
  }

  render() {
    return (
      <li data-id={this.itemId} class={this.completed ? 'completed' : null}>
        <div class="view">
          <input class="toggle" type="checkbox"
            onChange={() => this.checkItem(this.itemId)}
            checked={this.completed}
          />
          <label>{this.itemTitle}</label>
          <button onClick={() => this.deleteItem(this.itemId)} class="destroy"></button>
        </div>
      </li>
    );
  }

}
