import { newSpecPage } from '@stencil/core/testing';
import { TodoFooter } from '../todo-footer';

describe('todo-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TodoFooter],
      html: `<todo-footer></todo-footer>`,
    });
    expect(page.root).toEqualHtml(`
      <todo-footer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </todo-footer>
    `);
  });
});
