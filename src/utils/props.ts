export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};

export function getDynamicProps<T extends {}, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}
