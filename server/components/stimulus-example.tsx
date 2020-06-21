import h from 'vhtml';
import classNames from 'classnames';

import type { HC } from '../typings/hc.type';

const wrap = classNames('border-t-2', 'my-4', 'pt-4');
const text = classNames('mb-4');
const input = classNames('border', 'mr-2');
const button = classNames('px-4', 'border', 'bg-gray-200');
const output = classNames('mt-4', 'block');

export const StimulusExample: HC = () => (
  <div data-controller="hello" data-hello-greeting="" className={wrap}>
    <p className={text}>Type in something &amp; hit &quot;Greet&quot;.</p>
    <input
      data-target="hello.name"
      data-action="hello#store"
      type="text"
      placeholder="Enter your greetings…"
      className={input}
    />
    <button data-action="hello#greet" className={button}>
      Greet
    </button>
    <output data-target="hello.output" className={output}></output>
  </div>
);
