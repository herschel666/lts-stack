import type { vhtml, Component } from '../typings/html';

export type page = (title: string, Body: Component) => ReturnType<typeof vhtml>;
