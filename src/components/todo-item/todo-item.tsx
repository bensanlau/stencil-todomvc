import { Component, h, Prop, State } from '@stencil/core';
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
  @State() editing: boolean = false;
  @State() editText: string;

  editInput: HTMLInputElement;

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

  editItem() {
    this.editing = true;
    this.editText = this.itemTitle;
    setTimeout(() => this.editInput.focus(), 0);
  }

  saveEdit(id: string) {
    const items = todoStore.get('items');
    const itemToEdit = items.find((item) => item.id === id);
    itemToEdit.title = this.editText;
    todoStore.set('items', []); // Needs forced reset to 'listen'
    todoStore.set('items', items);
    this.editing = false;
  }

  handleEdit() {
    this.editText = this.editInput.value;
  }

  handleKeyUp(event: KeyboardEvent, id: string) {
    if (event.code === 'Enter') {
      this.saveEdit(id);
    }
  }

  render() {
    return (
      <li data-id={this.itemId} class={{'completed': this.completed, 'editing': this.editing}}>
        <div class="view">
          <input class="toggle" type="checkbox"
            onChange={() => this.checkItem(this.itemId)}
            checked={this.completed}
          />
          <label onDblClick={() => this.editItem()}>{this.itemTitle}</label>
          <button onClick={() => this.deleteItem(this.itemId)} class="destroy"></button>
        </div>
        <input class="edit"
          value={this.editText}
          ref={(el) => this.editInput = el as HTMLInputElement}
          onInput={() => this.handleEdit()}
          onBlur={() => this.saveEdit(this.itemId)}
          onKeyUp={(event) => this.handleKeyUp(event, this.itemId)}
        />
      </li>
    );
  }

}
