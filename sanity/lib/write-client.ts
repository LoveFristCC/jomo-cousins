import "server-only";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/lib/api";
import { writeToken } from "@/sanity/lib/token";

/**
 * Server-side Sanity client with write permissions
 * Use this for mutations (create, update, delete) in API routes
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Important: disable CDN for writes
  token: writeToken,
});
