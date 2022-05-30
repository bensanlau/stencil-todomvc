import { newSpecPage } from '@stencil/core/testing';
import { TodoApp } from '../todo-app';

describe('todo-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TodoApp],
      html: `<todo-app></todo-app>`,
    });
    expect(page.root).toEqualHtml(`
      <todo-app>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </todo-app>
    `);
  });
});
