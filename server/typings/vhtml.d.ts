declare module 'vhtml' {
  interface Attrs {
    [x: string]: unknown;
  }

  type VNode = (...attrs: Attrs[]) => string;

  function vhtml(name: string | VNode, ...attrs: Attrs[]): string;

  export default vhtml;
}
