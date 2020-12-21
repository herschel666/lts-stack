import {
  getQueriesForElement,
  fireEvent,
  prettyDOM,
} from '@testing-library/dom';
import { Application } from 'stimulus';

import GuestbookFormController from '../controllers/guestbook-form-controller';

const raf = () => new Promise((resolve) => requestAnimationFrame(resolve));

const html = String.raw;

const body = html` <form
  action="/guestbook"
  method="post"
  data-controller="guestbook-form"
  data-action="guestbook-form#submit"
  data-guestbook-form-target="form"
>
  <div data-guestbook-form-target="error" hidden></div>
  <input
    type="text"
    placeholder="Enter your name…"
    data-target="guestbook-form.author"
    data-action="input->guestbook-form#changeAuthor"
    required="true"
  />
  <textarea
    placeholder="Enter your message…"
    data-target="guestbook-form.message"
    data-action="input->guestbook-form#changeMessage"
    required="true"
  ></textarea>
  <div class="w-2/3">
    <button data-target="guestbook-form.submit">Submit</button>
  </div>
</form>`;

interface DOMResult {
  queries: ReturnType<typeof getQueriesForElement>;
  debug: (elem?: HTMLElement) => void;
  container: HTMLDivElement;
}

const getDOM = async (): Promise<DOMResult> => {
  const container = document.createElement('div');
  const boundQueries = getQueriesForElement(container);
  container.innerHTML = body;
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
