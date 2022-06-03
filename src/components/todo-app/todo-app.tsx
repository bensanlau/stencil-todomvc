import { Component, h, State } from '@stencil/core';
@Component({
  tag: 'todo-app',
  styleUrl: 'todo-app.css',
})

export class TodoApp {
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
          <todo-input classes="new-todo" placeholder="What needs to be done?" purpose="new-item"
            autofocus={true}
          />
        </header>

        <todo-list />
      </section>

    );
  }

}
