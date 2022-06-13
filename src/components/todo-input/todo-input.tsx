import { Component, h, Prop, State, Listen } from '@stencil/core';
import todoStore from '../../utils/store';

@Component({
  tag: 'todo-input',
  styleUrl: 'todo-input.css',
})
export class TodoInput {
  @State() inputValue: string;
  @Prop() classes: string;

  input: HTMLInputElement;

  @Listen('keydown')
  handleKeyUp(event: KeyboardEvent) {
    if (event.code === 'Enter' && this.inputValue) {
      todoStore.set('newItem', this.inputValue);
      this.input.value = '';
    }
  }

  componentDidLoad() {
    setTimeout(() => this.input.focus(), 0); // still doesn't bloody focus
  }

  handleInput() {
    this.inputValue = this.input.value;
  }

  render() {
    return (
      <input class="new-todo" placeholder="What needs to be done?"
        ref={(el) => this.input = el as HTMLInputElement}
        onInput={this.handleInput.bind(this)}
      />
    );
  }

}
