"use client";
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { singletonPlugin } from "@/sanity/plugins/settings";
import { productStructure } from "@/sanity/plugins/productStructure";
import { assistWithPresets } from "@/sanity/plugins/assist";
import { SyncToStripeAction } from "@/sanity/plugins/stripeSync";
import { AutoStripeSyncAction } from "@/sanity/plugins/autoStripeSync";
import { CleanOnPublishAction } from "@/sanity/plugins/cleanOnPublish";
import { CleanDocumentAction } from "@/sanity/plugins/cleanDocument";
import author from "@/sanity/schemas/documents/author";
import post from "@/sanity/schemas/documents/post";
import product, { productVariant } from "@/sanity/schemas/documents/product";
import digitalProduct from "@/sanity/schemas/documents/digitalProduct";
import couplesCornerPost from "@/sanity/schemas/documents/couplesCornerPost";
import prayerVideo from "@/sanity/schemas/documents/prayerVideo";
import prayerCategory from "@/sanity/schemas/documents/prayerCategory";
import prayerTestimonial from "@/sanity/schemas/documents/prayerTestimonial";
import settings from "@/sanity/schemas/singletons/settings";
import { resolveHref } from "@/sanity/lib/utils";

// const homeLocation = {
//   title: "Home",
//   href: "/",
// } satisfies DocumentLocation;

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: [
      // Singletons
      settings,
      // Documents
      post,
      author,
      product,
      digitalProduct,
      couplesCornerPost,
      prayerVideo,
      prayerCategory,
      prayerTestimonial,
      // Objects
      productVariant,
    ],
  },
  document: {
    actions: (prev, context) => {
      // Add clean & publish action for documents with portable text
      if (
        context.schemaType === "post" ||
        context.schemaType === "product" ||
        context.schemaType === "digitalProduct" ||
        context.schemaType === "couplesCornerPost" ||
        context.schemaType === "prayerVideo" ||
        context.schemaType === "prayerCategory"
      ) {
        // Filter out default publish action and add our clean publish action
        const filteredActions = prev.filter(
          (action) => action.name !== "publish"
        );

        // For products, also add Stripe sync actions
        if (
          context.schemaType === "product" ||
          context.schemaType === "digitalProduct"
        ) {
          return [
            CleanOnPublishAction,
            AutoStripeSyncAction,
            ...filteredActions,
            SyncToStripeAction,
            CleanDocumentAction,
          ];
        }

        // For posts, couples corner posts, and prayer content, just add the clean publish action
        return [CleanOnPublishAction, ...filteredActions, CleanDocumentAction];
      }
      return prev;
    },
  },
  plugins: [
    // presentationTool({
    //   resolve: {
    //     mainDocuments: defineDocuments([
    //       {
    //         route: "/posts/:slug",
    //         filter: `_type == "post" && slug.current == $slug`,
    //       },
    //     ]),
    //     locations: {
    //       settings: defineLocations({
    //         locations: [homeLocation],
    //         message: "This document is used on all pages",
    //         tone: "caution",
    //       }),
    //       post: defineLocations({
    //         select: {
    //           title: "title",
    //           slug: "slug.current",
    //         },
    //         resolve: (doc) => ({
    //           locations: [
    //             {
    //               title: doc?.title || "Untitled",
    //               href: resolveHref("post", doc?.slug)!,
    //             },
    //             homeLocation,
    //           ],
    //         }),
    //       }),
    //     },
    //   },
    //   previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    // }),
    structureTool({ structure: productStructure }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Sets up AI Assist with preset prompts
    // https://www.sanity.io/docs/ai-assist
    assistWithPresets(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV === "development" &&
      visionTool({ defaultApiVersion: apiVersion }),
  ].filter(Boolean) as PluginOptions[],
});
