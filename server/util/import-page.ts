import type Page from '@architect/views/page';

type PageFn = typeof Page;

const loadPage = (): PageFn | null => {
  try {
    return require('@architect/views/page');
  } catch {
    return null;
  }
};

export const importPage = (): PageFn => {
  const fn =
    loadPage() ||
    ((title: string, body: string) => `${title}
######
${body}`);
  return fn;
};
