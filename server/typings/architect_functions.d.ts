declare module '@architect/functions' {
  interface Http {
    helpers: {
      static(filename: string): string;
    };
  }
  interface Arc {
    http: Http;
  }

  const arc: Arc;

  export default arc;
}
