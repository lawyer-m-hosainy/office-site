import { Fragment, type ReactNode } from 'react';

interface Props {
  content: string;
}

/** Renders `**bold**` anywhere in a line, not only at its start. */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

/**
 * Renders the lightweight markup used in articles.json:
 * "## heading", "### subheading", "1. numbered", "- bullet", plain paragraphs,
 * with `**bold**` supported inside any of them.
 */
export default function ArticleBody({ content }: Props) {
  return (
    <div className="prose prose-lg prose-headings:text-primary prose-a:text-secondary max-w-none text-gray-800 leading-loose">
      {content.split('\n').map((line, index) => {
        if (!line.trim()) return null;

        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-bold text-primary mt-8 mb-3">
              {inline(line.slice(4).trim())}
            </h3>
          );
        }

        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-bold text-primary mt-10 mb-4">
              {inline(line.slice(3).trim())}
            </h2>
          );
        }

        if (line.match(/^\d+\./)) {
          return (
            <p key={index} className="mb-3 ms-4 flex gap-2">
              <span className="font-bold text-secondary shrink-0">{line.split('.')[0]}.</span>
              <span>{inline(line.substring(line.indexOf('.') + 1).trim())}</span>
            </p>
          );
        }

        if (line.startsWith('- ')) {
          return (
            <p key={index} className="mb-3 ms-4 flex gap-2">
              <span className="font-bold text-secondary shrink-0" aria-hidden="true">
                •
              </span>
              <span>{inline(line.substring(2).trim())}</span>
            </p>
          );
        }

        return (
          <p key={index} className="mb-6">
            {inline(line)}
          </p>
        );
      })}
    </div>
  );
}
