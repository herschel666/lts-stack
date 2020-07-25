import h from 'vhtml';
import {
  getQueriesForElement,
  fireEvent,
  prettyDOM,
} from '@testing-library/dom';
import { Application } from 'stimulus';

import GuestbookFormController from '../controllers/guestbook-form-controller';
import { Body } from '../../../server/http/get-guestbook/';

const raf = () => new Promise((resolve) => requestAnimationFrame(resolve));

interface DOMResult {
  queries: ReturnType<typeof getQueriesForElement>;
  debug: (elem?: HTMLElement) => void;
  container: HTMLDivElement;
}

const getDOM = async (): Promise<DOMResult> => {
  const container = document.createElement('div');
  const boundQueries = getQueriesForElement(container);
  container.innerHTML = h(Body, { entries: [] });
  const application = await Application.start(container);

  application.register('guestbook-form', GuestbookFormController);

  await raf();

  return {
    queries: boundQueries,
    debug: (elem = container) => console.log(prettyDOM(elem)),
    container,
  };
};

describe('guestbook-form-controller', () => {
  it('works', async () => {
    const {
      queries: { getByText, queryByText },
    } = await getDOM();
    const button = getByText('Submit') as HTMLButtonElement;

    // Most unfortunate way of doing it, but firing a "click"
    // doesn't make the form submit... :sadpanda:
    fireEvent.submit(button.form);

    expect(queryByText('Please fill all the fields.')).toBeTruthy();
  });
});
