export type TaskOpenArgs<
  USE_TASK extends () => {
    // biome-ignore lint/suspicious/noExplicitAny:
    open: (..._args: any[]) => void;
  },
> = Parameters<ReturnType<USE_TASK>["open"]>;
