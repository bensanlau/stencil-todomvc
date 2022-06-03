import { newE2EPage } from '@stencil/core/testing';

describe('todo-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<todo-input></todo-input>');

    const element = await page.find('todo-input');
    expect(element).toHaveClass('hydrated');
  });
});
