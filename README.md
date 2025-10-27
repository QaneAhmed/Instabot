## AI DM CRM Manager (MVP Scaffold)

Production-ready scaffold for an Instagram-only DM CRM powered by Next.js 16, Clerk, Convex, OpenAI, and the Instagram Graph API.

### Stack

- Next.js App Router with Tailwind CSS
- Clerk authentication with middleware guards
  - Set `BYPASS_CLERK=true` to temporarily disable auth while backend wiring is incomplete.
- Convex backend schema, actions, queries, and cron jobs (stubbed)
- OpenAI SDK integration helper
- Meta OAuth + webhook API route placeholders

### Local development

```bash
npm install
npm run dev
```

Configure the following environment variables before running the full flow:

- `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CONVEX_URL`, `CONVEX_DEPLOYMENT`
- `OPENAI_API_KEY`, `TOKEN_SECRET`
- `META_APP_ID`, `META_APP_SECRET`, `META_VERIFY_TOKEN`, `META_OAUTH_REDIRECT_URI`

### Next steps

1. Run `npx convex dev` to generate `_generated` files and connect to your Convex deployment.
2. Implement the TODOs in Convex actions/mutations/queries to handle real data.
3. Wire the inbox UI to Convex hooks (`useQuery`, `useMutation`, `useAction`).
4. Complete the Meta OAuth callback by calling Convex actions and persisting tokens.
5. Replace placeholder data in the inbox and follow-ups UI with live queries.
