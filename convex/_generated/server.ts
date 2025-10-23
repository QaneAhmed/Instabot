// Temporary shim so Next.js builds succeed before running `npx convex dev`.
// Replace with the generated file from Convex as soon as the deployment is configured.
type Handler<Ctx, Args, Return> = (ctx: Ctx, args: Args) => Return | Promise<Return>;

type TableBuilder = {
  index: (name: string, fields: string[]) => TableBuilder;
};

export const defineSchema = <T>(schema: T): T => schema;

export const defineTable = <Fields>(fields: Fields): TableBuilder & { fields: Fields } => {
  const builder: TableBuilder & { fields: Fields } = {
    fields,
    index: () => builder,
  };
  return builder;
};

export const v = {
  string: () => ({}),
  number: () => ({}),
  boolean: () => ({}),
  optional: (inner: unknown) => ({ optional: inner }),
  array: (inner: unknown) => ({ array: inner }),
  object: (shape: unknown) => ({ object: shape }),
  any: () => ({}),
  id: (table: string) => ({ id: table }),
};

export const cronJobs = () => ({
  interval: (..._args: unknown[]) => undefined,
});

export const action = <Args, Return>(definition: {
  args: Args;
  handler: Handler<unknown, Args, Return>;
}) => definition;

export const mutation = <Args, Return>(definition: {
  args: Args;
  handler: Handler<unknown, Args, Return>;
}) => definition;

export const query = <Args, Return>(definition: {
  args: Args;
  handler: Handler<unknown, Args, Return>;
}) => definition;

export const internalAction = action;
export const internalMutation = mutation;
export const internalQuery = query;
