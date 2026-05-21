/**
 * Keboola query service client — server-side only.
 *
 * Reads from the workspace pointed at by KBC_URL / KBC_TOKEN / WORKSPACE_ID.
 * In production these are injected by the Keboola data-app container via
 * `dataApp.secrets` (mirrored from `#KEBOOLA_TOKEN` / `#KBC_TOKEN`).
 *
 * Locally, populate .env.local — see .env.local.example.
 *
 * NEVER import this from a client component. The token must not cross the
 * server/client boundary. Server components and route handlers only.
 */

import "server-only";

export type KeboolaEnv = {
  url: string;
  token: string;
  workspace: string | undefined;
  branch: string | undefined;
};

export function readEnv(): KeboolaEnv {
  // Mirror "#"-prefixed Keboola secrets to un-prefixed for ergonomics.
  const env = process.env;
  const url = env.KBC_URL || env["#KBC_URL"] || "";
  const token = env.KBC_TOKEN || env["#KBC_TOKEN"] || env["#KEBOOLA_TOKEN"] || "";
  const workspace = env.WORKSPACE_ID || env["#WORKSPACE_ID"];
  const branch = env.BRANCH_ID || env["#BRANCH_ID"];
  return { url, token, workspace, branch };
}

export function isConfigured(env = readEnv()): boolean {
  return Boolean(env.url && env.token && env.workspace);
}

type QueryResult<T> = {
  rows: T[];
  columns: string[];
  durationMs: number;
};

/**
 * Run a SQL query through the Keboola Query Service.
 * Tolerates the two common response shapes (rows / data) — both have
 * shipped in production at various points.
 */
export async function runQuery<T = Record<string, unknown>>(
  sql: string,
  env: KeboolaEnv = readEnv(),
): Promise<QueryResult<T>> {
  if (!isConfigured(env)) {
    throw new Error("Keboola env not configured");
  }
  const started = performance.now();
  const res = await fetch(`${env.url.replace(/\/$/, "")}/v2/storage/branch/${env.branch ?? "default"}/workspaces/${env.workspace}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-StorageApi-Token": env.token,
    },
    body: JSON.stringify({ query: sql, format: "json" }),
    next: { revalidate: 900 }, // 15 minute ISR cache
  });
  if (!res.ok) {
    throw new Error(`keboola query failed: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { rows?: T[]; data?: T[]; columns?: string[] };
  const rows = (json.rows ?? json.data ?? []) as T[];
  const columns = json.columns ?? (rows[0] ? Object.keys(rows[0]) : []);
  return { rows, columns, durationMs: performance.now() - started };
}
