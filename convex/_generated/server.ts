// Temporary shim so Next.js builds succeed before running `npx convex dev`.
// Replace with the generated file from Convex as soon as the deployment is configured.
type Handler<Ctx, Args, Return> = (ctx: Ctx, args: Args) => Return | Promise<Return>;

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
