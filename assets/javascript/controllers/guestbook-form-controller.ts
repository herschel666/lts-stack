import { Controller } from 'stimulus';
import Turbolinks from 'turbolinks';

enum Status {
  Ok = 'Ok',
  Invalid = 'Invalid',
  Error = 'Error',
}

interface PostResult {
  status: Status;
  response: null | { entryId?: string };
}

const getStatus = (statusCode: number): Status => {
  switch (statusCode) {
    case 200:
      return Status.Ok;
    case 400:
      return Status.Invalid;
    default:
      return Status.Error;
  }
};

export default class extends Controller {
  formTarget: HTMLFormElement;
  formTargets: HTMLDivElement[];
  hasFormTarget: boolean;
  errorTarget: HTMLDivElement;
  errorTargets: HTMLDivElement[];
  hasErrorTarget: boolean;
  successTarget: HTMLDivElement;
  successTargets: HTMLDivElement[];
  hasSuccessTarget: boolean;
  authorTarget: HTMLInputElement;
  authorTargets: HTMLInputElement[];
  hasAuthorTarget: boolean;
  messageTarget: HTMLTextAreaElement;
  messageTargets: HTMLTextAreaElement[];
  hasMessageTarget: boolean;
  submitTarget: HTMLButtonElement;
  submitTargets: HTMLButtonElement[];
  hasSubmitTarget: boolean;

  static targets = ['form', 'error', 'success', 'author', 'message', 'submit'];

  isValid(): boolean {
    return Boolean(this.author && this.message);
  }

  showError(message: string): void {
    this.hideSuccess();
    this.errorTarget.textContent = message;
    this.errorTarget.removeAttribute('hidden');
  }

  hideError(): void {
    this.errorTarget.textContent = '';
    this.errorTarget.setAttribute('hidden', 'true');
  }

  showSuccess(): void {
    this.hideError();
    this.successTarget.removeAttribute('hidden');
  }

  hideSuccess(): void {
    this.successTarget.setAttribute('hidden', 'true');
  }

  setDisableForm(value: boolean): void {
    this.authorTarget.disabled = value;
    this.messageTarget.disabled = value;
    this.submitTarget.disabled = value;
  }

  async post(url: string): Promise<PostResult> {
    const createdAt = new Date().toISOString();
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify({
        author: this.author,
        message: this.message,
        createdAt: createdAt,
      }),
    });
    const json = response.status === 200 ? await response.json() : null;
    return {
      status: getStatus(response.status),
      response: json,
    };
  }

  async submit(event: Event): Promise<void> {
    event.preventDefault();
    const url = (event.target as HTMLFormElement).action;

    if (!this.isValid()) {
      this.showError('Please fill out all the fields.');
    } else {
      this.setDisableForm(true);
      this.hideError();

      const { status, response } = await this.post(url);
      this.setDisableForm(false);

      switch (status) {
        case Status.Ok:
          const { entryId } = response;
          const hash = entryId ? `#entry-${entryId}` : '';
          this.formTarget.reset();
          Turbolinks.clearCache();
          Turbolinks.visit(`./guestbook${hash}`);
          break;
        case Status.Invalid:
          this.showError('Please fill out all the fields.');
          break;
        case Status.Error:
          this.showError('Something went wrong. Please try again later.');
      }
    }
  }

  get author(): string {
    return this.authorTarget.value.trim();
  }

  get message(): string {
    return this.messageTarget.value.trim();
  }
}
