interface Props {
  content: string;
}

/**
 * Renders the lightweight markup used in articles.json:
 * "## heading", "**lead** text", "1. numbered", "- bullet", plain paragraphs.
 */
export default function ArticleBody({ content }: Props) {
  return (
    <div className="prose prose-lg prose-headings:text-primary prose-a:text-secondary max-w-none text-gray-800 leading-loose">
      {content.split('\n').map((line, index) => {
        if (!line.trim()) return null;

        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-bold text-primary mt-10 mb-4">
              {line.slice(3).trim()}
            </h2>
          );
        }

        if (line.startsWith('**') && line.includes('**', 2)) {
          const endIdx = line.indexOf('**', 2);
          return (
            <p key={index} className="mb-4">
              <strong>{line.substring(2, endIdx)}</strong>
              {line.substring(endIdx + 2)}
            </p>
          );
        }

        if (line.match(/^\d+\./)) {
          return (
            <p key={index} className="mb-2 ms-4 flex gap-2">
              <span className="font-bold text-secondary">{line.split('.')[0]}.</span>
              {line.substring(line.indexOf('.') + 1).trim()}
            </p>
          );
        }

        if (line.startsWith('- ')) {
          return (
            <p key={index} className="mb-2 ms-4 flex gap-2">
              <span className="font-bold text-secondary" aria-hidden="true">
                •
              </span>
              {line.substring(2).trim()}
            </p>
          );
        }

        return (
          <p key={index} className="mb-6">
            {line}
          </p>
        );
      })}
    </div>
  );
}
