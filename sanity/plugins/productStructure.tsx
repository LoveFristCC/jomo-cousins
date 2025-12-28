/**
 * Custom desk structure for products with inventory dashboard
 */

import { PackageIcon, SearchIcon, WarningOutlineIcon } from "@sanity/icons";
import { type StructureResolver } from "sanity/structure";

export const productStructure: StructureResolver = (S) => {
  return S.list()
    .title("Content")
    .items([
      // Settings singleton
      S.listItem()
        .title("Settings")
        .schemaType("settings")
        .child(S.editor().id("settings").schemaType("settings").documentId("settings")),

      S.divider(),

      // Blog section
      S.listItem()
        .title("Blog Posts")
        .schemaType("post")
        .child(S.documentTypeList("post").title("Posts")),

      S.listItem()
        .title("Authors")
        .schemaType("author")
        .child(S.documentTypeList("author").title("Authors")),

      S.divider(),

      // Couples Corner section
      S.listItem()
        .title("Couples Corner Blog")
        .schemaType("couplesCornerPost")
        .child(S.documentTypeList("couplesCornerPost").title("Couples Corner Posts")),

      S.divider(),

      // Prayer section
      S.listItem()
        .title("🙏 Prayer Videos")
        .schemaType("prayerVideo")
        .child(
          S.list()
            .title("Prayer Management")
            .items([
              // All Prayer Videos
              S.listItem()
                .title("All Prayer Videos")
                .child(
                  S.documentTypeList("prayerVideo")
                    .title("All Prayer Videos")
                    .filter('_type == "prayerVideo"')
                ),

              S.divider(),

              // Recent Prayers
              S.listItem()
                .title("📅 Recent Prayers")
                .child(
                  S.documentList()
                    .title("Recent Prayers")
                    .filter('_type == "prayerVideo"')
                    .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
                ),

              // Prayers by Category
              S.listItem()
                .title("📂 Browse by Category")
                .child(
                  S.list()
                    .title("Prayer Videos by Category")
                    .items([
                      S.listItem()
                        .title("All Categories")
                        .child(S.documentTypeList("prayerCategory").title("Prayer Categories")),
                      S.divider(),
                      // Add dynamic category views here if needed
                    ])
                ),

              S.divider(),

              // Prayer Categories
              S.listItem()
                .title("📂 Prayer Categories")
                .schemaType("prayerCategory")
                .child(S.documentTypeList("prayerCategory").title("Prayer Categories")),

              // Prayer Testimonials
              S.listItem()
                .title("💬 Prayer Testimonials")
                .schemaType("prayerTestimonial")
                .child(S.documentTypeList("prayerTestimonial").title("Prayer Testimonials")),
            ])
        ),

      S.divider(),

      // Products section with inventory dashboard
      S.listItem()
        .title("Products")
        .icon(PackageIcon)
        .child(
          S.list()
            .title("Product Management")
            .items([
              // All products
              S.listItem()
                .title("All Products")
                .icon(SearchIcon)
                .child(
                  S.documentTypeList("product")
                    .title("All Products")
                    .filter('_type == "product"')
                ),

              S.divider(),

              // Inventory Dashboard
              S.listItem()
                .title("📊 Inventory Dashboard")
                .child(
                  S.list()
                    .title("Inventory Dashboard")
                    .items([
                      // Low Stock Items
                      S.listItem()
                        .title("🟡 Low Stock Items")
                        .icon(WarningOutlineIcon)
                        .child(
                          S.documentList()
                            .title("Low Stock Products")
                            .filter(
                              `_type == "product" && trackInventory == true && variants[].inventory <= lowStockThreshold`
                            )
                            .params({})
                        ),

                      // Out of Stock Items
                      S.listItem()
                        .title("🔴 Out of Stock Items")
                        .child(
                          S.documentList()
                            .title("Out of Stock Products")
                            .filter(
                              `_type == "product" && trackInventory == true &&
                               count(variants[inventory > 0]) == 0`
                            )
                        ),

                      // In Stock Items
                      S.listItem()
                        .title("🟢 All In Stock")
                        .child(
                          S.documentList()
                            .title("In Stock Products")
                            .filter(
                              `_type == "product" && trackInventory == true &&
                               count(variants[inventory > 0]) > 0`
                            )
                        ),

                      S.divider(),

                      // Products by Category
                      S.listItem()
                        .title("📚 Books")
                        .child(
                          S.documentList()
                            .title("Books")
                            .filter('_type == "product" && category == "books"')
                        ),

                      S.listItem()
                        .title("👕 T-Shirts")
                        .child(
                          S.documentList()
                            .title("T-Shirts")
                            .filter('_type == "product" && category == "tshirts"')
                        ),

                      S.listItem()
                        .title("🧥 Hoodies")
                        .child(
                          S.documentList()
                            .title("Hoodies")
                            .filter('_type == "product" && category == "hoodies"')
                        ),

                      S.listItem()
                        .title("🎒 Accessories")
                        .child(
                          S.documentList()
                            .title("Accessories")
                            .filter('_type == "product" && category == "accessories"')
                        ),
                    ])
                ),
            ])
        ),

      // Digital Products (Upsells)
      S.listItem()
        .title("Digital Products")
        .schemaType("digitalProduct")
        .child(
          S.documentTypeList("digitalProduct")
            .title("Digital Products / Upsells")
            .filter('_type == "digitalProduct"')
        ),
    ]);
};
