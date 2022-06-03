import { newSpecPage } from '@stencil/core/testing';
import { TodoToggle } from '../todo-toggle';

describe('todo-toggle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TodoToggle],
      html: `<todo-toggle></todo-toggle>`,
    });
    expect(page.root).toEqualHtml(`
      <todo-toggle>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </todo-toggle>
    `);
  });
});
