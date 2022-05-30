import { newE2EPage } from '@stencil/core/testing';

describe('todo-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<todo-app></todo-app>');

    const element = await page.find('todo-app');
    expect(element).toHaveClass('hydrated');
  });
});
