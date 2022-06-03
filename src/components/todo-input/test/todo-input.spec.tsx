import { newSpecPage } from '@stencil/core/testing';
import { TodoInput } from '../todo-input';

describe('todo-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TodoInput],
      html: `<todo-input></todo-input>`,
    });
    expect(page.root).toEqualHtml(`
      <todo-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </todo-input>
    `);
  });
});
