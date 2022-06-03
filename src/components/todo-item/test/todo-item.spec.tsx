import { newSpecPage } from '@stencil/core/testing';
import { TodoItem } from '../todo-item';

describe('todo-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TodoItem],
      html: `<todo-item></todo-item>`,
    });
    expect(page.root).toEqualHtml(`
      <todo-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </todo-item>
    `);
  });
});
