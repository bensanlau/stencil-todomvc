import { newE2EPage } from '@stencil/core/testing';

describe('todo-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<todo-footer></todo-footer>');

    const element = await page.find('todo-footer');
    expect(element).toHaveClass('hydrated');
  });
});
