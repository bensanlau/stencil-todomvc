import { Component, h, Prop } from '@stencil/core';
import todoStore from '../../utils/store';

@Component({
  tag: 'todo-input',
  styleUrl: 'todo-input.css',
})
export class TodoInput {
  @Prop() autofocus: boolean;
  @Prop() classes: string;
  @Prop() placeholder: string;
  @Prop() purpose: string;

  handleKeyUp(event: any) {
    const input = event.currentTarget;
    const value = input.value;

    if (event.code === 'Enter' && value) {
      todoStore.set('newItem', value);
      input.value = '';
    }
  }

  render() {
    return (
      <input  
        autofocus={this.autofocus} // It doens't seem to autofocus
        class={this.classes}
        placeholder={this.placeholder}
        onKeyUp={(event) => this.handleKeyUp(event)}
        data-purpose={this.purpose}
      />
    );
  }

}
