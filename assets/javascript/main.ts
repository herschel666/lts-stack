import Turbolinks from 'turbolinks';
import { Application } from 'stimulus';
import { definitionsFromContext } from 'stimulus/webpack-helpers';

const application = Application.start();
const context = require.context('./controllers', false, /\.js$/);

application.load(definitionsFromContext(context));

Turbolinks.start();
