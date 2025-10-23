import { cronJobs } from "./_generated/server";
import { api } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "Refresh long-lived Instagram tokens",
  { hours: 24 },
  api.actions.integrations_meta.refreshLongLivedToken,
  {},
);

export default crons;
