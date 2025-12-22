/**
 * Utility to clean hidden Unicode characters from Sanity documents
 * Removes zero-width spaces and other invisible characters that can cause rendering issues
 */

/**
 * Clean hidden characters from a string
 */
export function cleanString(text: string): string {
  if (typeof text !== 'string') return text;

  return text
    .replace(/[\u200B\u200C\u200D\u200E\u200F\uFEFF]/g, '') // Zero-width chars
    .replace(/\u00AD/g, '') // Soft hyphen
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // Control chars
}

/**
 * Clean hidden characters from PortableText blocks
 */
export function cleanPortableTextBlocks(blocks: any[]): any[] {
  if (!Array.isArray(blocks)) return blocks;

  return blocks.map((block: any) => {
    if (!block || block._type !== 'block') return block;

    return {
      ...block,
      children: Array.isArray(block.children)
        ? block.children.map((child: any) => {
            if (child?.text && typeof child.text === 'string') {
              const cleaned = cleanString(child.text);
              if (cleaned !== child.text) {
                console.log('🧹 Cleaned hidden characters from text block');
              }
              return { ...child, text: cleaned };
            }
            return child;
          })
        : block.children,
    };
  });
}

/**
 * Recursively clean all text fields in a document
 */
export function cleanDocument(doc: any): any {
  if (!doc || typeof doc !== 'object') return doc;

  if (Array.isArray(doc)) {
    return doc.map(cleanDocument);
  }

  const cleaned: any = {};

  for (const [key, value] of Object.entries(doc)) {
    if (typeof value === 'string') {
      cleaned[key] = cleanString(value);
    } else if (Array.isArray(value) && value[0]?._type === 'block') {
      // PortableText array
      cleaned[key] = cleanPortableTextBlocks(value);
    } else if (typeof value === 'object' && value !== null) {
      cleaned[key] = cleanDocument(value);
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
}
