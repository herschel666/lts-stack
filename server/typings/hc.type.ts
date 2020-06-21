import vhtml from 'vhtml';

// eslint-disable-next-line @typescript-eslint/ban-types
export type HC<T extends object = Record<string, unknown>> = (
  props: T & { children?: string }
) => ReturnType<typeof vhtml>;
