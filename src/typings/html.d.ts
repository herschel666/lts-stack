import type { JSX, Attributes, ComponentChildren } from 'preact';

type Component<P = Record<string, unknown>> = (props: P) => string | null;

export function vhtml(
  type: string,
  props:
    | (JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, unknown>)
    | null,
  ...children: ComponentChildren[]
): string;

export function vhtml<P>(
  type: Component<P>,
  props: (Attributes & P) | null,
  ...children: ComponentChildren[]
): string;

// Based on `htm.bind` from 'htm/dist/htm.t.ds'
export type Html = (
  strings: TemplateStringsArray,
  ...values: any[]
) => ReturnType<typeof vhtml> | ReturnType<typeof vhtml>[];
