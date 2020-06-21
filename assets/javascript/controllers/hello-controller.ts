import { Controller } from 'stimulus';

export default class extends Controller {
  nameTarget: HTMLInputElement;
  nameTargets: HTMLInputElement[];
  hasNameTarget: boolean;
  outputTarget: HTMLInputElement;
  outputTargets: HTMLInputElement[];
  hasOutputTarget: boolean;

  static targets = ['name', 'output'];

  store() {
    this.data.set('greeting', this.name);
  }

  greet() {
    this.outputTarget.textContent = `Hello, ${this.greeting}!`;
  }

  get name() {
    return this.nameTarget.value;
  }

  get greeting() {
    return this.data.get('greeting');
  }
}
