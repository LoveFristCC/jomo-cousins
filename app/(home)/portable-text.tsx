"use client";

/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import React from "react";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);


  // Clean up any hidden characters that slip through after render
  React.useEffect(() => {
    if (containerRef.current) {
      const walker = document.createTreeWalker(
        containerRef.current,
        NodeFilter.SHOW_TEXT,
        null
      );

      const textNodes: Text[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) {
        textNodes.push(node as Text);
      }

      textNodes.forEach((textNode) => {
        if (textNode.textContent) {
          const cleaned = textNode.textContent
            .replace(/[\u200B\u200C\u200D\u200E\u200F\uFEFF]/g, '')
            .replace(/\u00AD/g, '')
            .replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

          if (cleaned !== textNode.textContent) {
            console.log('🧹 Cleaned DOM node:', {
              before: textNode.textContent.length,
              after: cleaned.length,
              removed: textNode.textContent.length - cleaned.length
            });
            textNode.textContent = cleaned;
          }
        }
      });
    }
  }, [ value ]);

  // Helper to clean rendered text
  const cleanRenderedText = (text: string): string => {
    return text
      .replace(/[\u200B\u200C\u200D\u200E\u200F\uFEFF]/g, '')
      .replace(/\u00AD/g, '')
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
  };

  const components: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className="mb-4 text-4xl font-bold">{ children }</h1>
      ),
      h2: ({ children }) => (
        <h2 className="mb-4 text-3xl font-bold">{ children }</h2>
      ),
      h3: ({ children }) => (
        <h3 className="mb-3 text-2xl font-bold">{ children }</h3>
      ),
      h4: ({ children }) => (
        <h4 className="mb-3 text-xl font-semibold">{ children }</h4>
      ),
      h5: ({ children }) => (
        <h5 className="mb-2 text-lg font-semibold">{ children }</h5>
      ),
      h6: ({ children }) => (
        <h6 className="mb-2 text-base font-semibold">{ children }</h6>
      ),
      normal: ({ children }) => (
        <p className="mb-4">{ children }</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
          { children }
        </blockquote>
      ),
    },
    marks: {
      // This is the key - intercept text rendering at the mark level
      // PortableText passes text through marks, even if there are no marks
      code: ({ children, value }) => {
        const text = typeof children === 'string' ? cleanRenderedText(children) : children;
        return <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{ text }</code>;
      },
      strong: ({ children }) => {
        const text = typeof children === 'string' ? cleanRenderedText(children) : children;
        return <strong className="font-bold">{ text }</strong>;
      },
      em: ({ children }) => {
        const text = typeof children === 'string' ? cleanRenderedText(children) : children;
        return <em className="italic">{ text }</em>;
      },
      link: ({ children, value }) => {
        const target = value?.href?.startsWith('http') ? '_blank' : undefined;
        const text = typeof children === 'string' ? cleanRenderedText(children) : children;
        return (
          <a
            href={ value?.href }
            target={ target }
            rel={ target === '_blank' ? 'noreferrer noopener' : undefined }
            className="text-[#e31e24] hover:underline"
          >
            { text }
          </a>
        );
      },
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-4 list-disc list-inside space-y-2">{ children }</ul>
      ),
      number: ({ children }) => (
        <ol className="mb-4 list-decimal list-inside space-y-2">{ children }</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="ml-4">{ children }</li>
      ),
      number: ({ children }) => (
        <li className="ml-4">{ children }</li>
      ),
    },
  };

  return (
    <div ref={ containerRef } className={ [ "prose", className ].filter(Boolean).join(" ") }>
      <PortableText components={ components } value={ value } />
    </div>
  );
}
