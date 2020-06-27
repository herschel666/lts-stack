declare module 'vhtml' {
  import { JSX, Attributes, ComponentChildren } from 'preact';

  type Component<P = Record<string, unknown>> = (props: P) => string | null;

  function vhtml(
    type: string,
    props:
      | (JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, unknown>)
      | null,
    ...children: ComponentChildren[]
  ): string;
  function vhtml<P>(
    type: Component<P>,
    props: (Attributes & P) | null,
    ...children: ComponentChildren[]
  ): string;

  // eslint-disable-next-line @typescript-eslint/ban-types
  export type HC<T extends object = Record<string, unknown>> = (
    props: T & { children?: string }
  ) => ReturnType<typeof vhtml>;

  export default vhtml;
}
