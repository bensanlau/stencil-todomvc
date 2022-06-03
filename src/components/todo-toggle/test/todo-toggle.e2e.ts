import { newE2EPage } from '@stencil/core/testing';

describe('todo-toggle', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<todo-toggle></todo-toggle>');

    const element = await page.find('todo-toggle');
    expect(element).toHaveClass('hydrated');
  });
});
