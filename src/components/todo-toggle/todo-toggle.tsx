import { Component, Host, h, Prop } from '@stencil/core';
import todoStore from '../../utils/store';

@Component({
  tag: 'todo-toggle',
  styleUrl: 'todo-toggle.css',
})
export class TodoToggle {
  @Prop() allChecked: boolean;

  toggleAll() {
    const items = todoStore.get('items');
    items.map(item => item.completed = !this.allChecked);
    todoStore.set('items', []); // Needs forced reset to 'listen'
    todoStore.set('items', items);
  }

  render() {
    return (
      <Host>
        <input id="toggle-all" class="toggle-all" type="checkbox"
          onChange={() => this.toggleAll()} checked={this.allChecked} />
        <label htmlFor="toggle-all">Mark all as complete</label>
      </Host>
    );
  }

}
