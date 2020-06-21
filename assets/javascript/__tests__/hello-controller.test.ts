import h from 'vhtml';
import { getQueriesForElement, fireEvent } from '@testing-library/dom';
import { Application } from 'stimulus';

import HelloController from '../controllers/hello-controller';
import { StimulusExample } from '../../../server/components/stimulus-example';

const raf = () => new Promise((resolve) => requestAnimationFrame(resolve));

const getDOM = async (): Promise<ReturnType<typeof getQueriesForElement>> => {
  const container = document.createElement('div');
  const boundQueries = getQueriesForElement(container);
  container.innerHTML = h(StimulusExample);
  const application = await Application.start(container);

  application.register('hello', HelloController);

  await raf();

  return boundQueries;
};

describe('hello_controller', () => {
  it('works', async () => {
    const { getByPlaceholderText, getByText } = await getDOM();
    const input = getByPlaceholderText(
      'Enter your greetings…'
    ) as HTMLInputElement;
    const button = getByText('Greet') as HTMLButtonElement;

    input.value = 'World';
    fireEvent.change(input);
    fireEvent.click(button);

    getByText('Hello, World!');
  });
});
