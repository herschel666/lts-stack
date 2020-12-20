const { html } = require('./lib/html');
const { page } = require('./lib/page');
const { Button } = require('./components/button');
const { Comment } = require('./components/comment');
const { Fieldset } = require('./components/fieldset');
const { FormRow } = require('./components/form-row');
const { Heading } = require('./components/heading');
const { TextArea, TextInput } = require('./components/input');
const { Page } = require('./components/page');
const { PageHeader } = require('./components/page-header');
const { PageTitle } = require('./components/page-title');
const { SlimContent } = require('./components/slim-content');

const components = {
  Button,
  Comment,
  Fieldset,
  FormRow,
  Heading,
  TextArea,
  TextInput,
  Page,
  PageHeader,
  PageTitle,
  SlimContent,
};

module.exports = { html, page, components };
