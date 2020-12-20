import { Controller } from 'stimulus';
import type { Context as StimulusCtx } from 'stimulus';
import { createMachine, interpret, assign } from 'xstate';
import type {
  Interpreter,
  StateNode,
  StateFrom,
  DoneInvokeEvent,
} from 'xstate';
import Turbolinks from 'turbolinks';

interface Context {
  readonly url?: string;
  readonly author: string;
  readonly message: string;
  readonly feedback: string;
}

type ChangeAuthorEvent = { type: 'CHANGE_AUTHOR'; value: string };
type ChangeMessageEvent = { type: 'CHANGE_MESSAGE'; value: string };
type Events =
  | ChangeAuthorEvent
  | ChangeMessageEvent
  | DoneInvokeEvent<Error>
  | { type: 'VALIDATE' };

type StateSchema =
  | { value: 'idle'; context: Context }
  | { value: 'valid'; context: Context };

const machine = createMachine<Context, Events, StateSchema>(
  {
    id: 'guestbook-form',
    context: {
      author: '',
      message: '',
      feedback: '',
    },
    initial: 'idle',
    states: {
      idle: {
        on: {
          CHANGE_AUTHOR: {
            actions: 'assignAuthor',
          },
          CHANGE_MESSAGE: {
            actions: 'assignMessage',
          },
          VALIDATE: [
            {
              cond: 'isValid',
              target: 'valid',
              actions: 'clearFeedback',
            },
            {
              cond: 'isInvalid',
              target: 'idle',
              actions: 'setInvalidFeedback',
            },
          ],
        },
      },
      valid: {
        invoke: {
          id: 'submit-form',
          src: 'submitForm',
          onDone: 'idle',
          onError: [
            {
              target: 'idle',
              cond: 'invalidRequest',
              actions: 'setInvalidFeedback',
            },
            {
              target: 'idle',
              cond: 'failedRequest',
              actions: 'setErrorFeedback',
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      assignAuthor: assign<Context>({
        author: (_, { value }: ChangeAuthorEvent) => value,
      }),
      assignMessage: assign<Context>({
        message: (_, { value }: ChangeMessageEvent) => value,
      }),
      clearFeedback: assign({ feedback: '' }),
      setInvalidFeedback: assign({
        feedback: 'Please fill all the fields.',
      }),
      setErrorFeedback: assign({
        feedback: 'Something went wrong.',
      }),
    },
    guards: {
      isValid: (ctx: Context): boolean =>
        Boolean(ctx.author.length && ctx.message.length),
      isInvalid: (ctx: Context): boolean =>
        !ctx.author.length && !ctx.message.length,
      invalidRequest: (_, event: DoneInvokeEvent<Error>) =>
        event.data.message === '400',
      failedRequest: (_, event: DoneInvokeEvent<Error>) =>
        event.data.message !== '400',
    },
    services: {
      submitForm: ({ url, author, message }: Context) => async ():
        | Promise<void>
        | never => {
        const createdAt = new Date().toISOString();
        const response = await fetch(url, {
          method: 'post',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ author, message, createdAt }),
        });

        if (response.status !== 200) {
          throw new Error(String(response.status));
        }

        const { entryId } = await response.json();
        const hash = entryId ? `#entry-${entryId}` : '';
        Turbolinks.clearCache();
        Turbolinks.visit(`./guestbook${hash}`);
      },
    },
  }
);

export default class extends Controller {
  private fsmService: Interpreter<Context, StateSchema, Events>;
  formTarget: HTMLFormElement;
  errorTarget: HTMLDivElement;
  hasErrorTarget: boolean;

  static targets = ['form', 'error'];

  public constructor(context: StimulusCtx) {
    super(context);

    const formMachine: StateNode<
      Context,
      StateSchema,
      Events
    > = machine.withContext({
      ...machine.context,
      url: this.formTarget.action,
    });
    this.fsmService = interpret<Context, StateSchema, Events>(formMachine);
    this.fsmService.subscribe(this.setFeedback.bind(this));
    this.fsmService.start();
  }

  private setFeedback(state: StateFrom<typeof machine>) {
    if (this.hasErrorTarget) {
      this.errorTarget.textContent = state.context.feedback;
      this.errorTarget.hidden = state.context.feedback === '';
    }
  }

  public changeAuthor(event: InputEvent): void {
    if (event.target instanceof HTMLInputElement) {
      const { value } = event.target;

      this.fsmService.send({
        type: 'CHANGE_AUTHOR',
        value,
      });
    }
  }

  public changeMessage(event: InputEvent): void {
    if (event.target instanceof HTMLTextAreaElement) {
      const { value } = event.target;

      this.fsmService.send({
        type: 'CHANGE_MESSAGE',
        value,
      });
    }
  }

  public async submit(event: Event): Promise<void> {
    event.preventDefault();
    this.fsmService.send('VALIDATE');
  }
}
