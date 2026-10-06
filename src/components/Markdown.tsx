import { Fragment, type ReactNode } from 'react';
import { Link } from '@/lib/router-compat';

/**
 * Minimal, safe Markdown renderer (no raw HTML). Supports ## / ### / ####
 * headings, paragraphs, - / 1. lists, > quotes, **bold**, *italic*, `code`
 * and [links](url). Internal links (/path) render as router links.
 */

const isInternal = (url: string) => url.startsWith('/') && !url.startsWith('//');
const safeUrl = (url: string) => /^(https?:\/\/|\/|#|mailto:)/i.test(url.trim());

export function renderInline(text: string, keyBase = 'i'): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|_([^_]+)_|`([^`]+)`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${keyBase}-${n++}`;
    if (m[2] !== undefined) {
      const url = m[3];
      if (!safeUrl(url)) out.push(m[2]);
      else if (isInternal(url))
        out.push(<Link key={k} to={url} className="text-accent underline-offset-2 hover:underline">{m[2]}</Link>);
      else
        out.push(
          <a key={k} href={url} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-2 hover:underline">
            {m[2]}
          </a>,
        );
    } else if (m[4] !== undefined) out.push(<strong key={k}>{m[4]}</strong>);
    else if (m[5] !== undefined || m[6] !== undefined) out.push(<em key={k}>{m[5] ?? m[6]}</em>);
    else if (m[7] !== undefined) out.push(<code key={k} className="rounded-sm bg-secondary px-1 text-[0.9em]">{m[7]}</code>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function markdownWordCount(md: string) {
  return md.replace(/[#>*_`[\]()-]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
}

const Markdown = ({ source }: { source: string }) => {
  const blocks = source.replace(/\r\n/g, '\n').split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        const h = /^(#{1,4})\s+(.*)$/.exec(block);
        if (h && lines.length === 1) {
          const level = h[1].length;
          if (level <= 2)
            return <h2 key={i} className="mt-10 font-serif text-2xl md:text-3xl text-foreground">{renderInline(h[2], `h${i}`)}</h2>;
          if (level === 3)
            return <h3 key={i} className="mt-6 font-serif text-xl text-foreground">{renderInline(h[2], `h${i}`)}</h3>;
          return <h4 key={i} className="mt-4 font-serif text-lg text-foreground">{renderInline(h[2], `h${i}`)}</h4>;
        }
        if (lines.every((l) => /^\s*[-*]\s+/.test(l)))
          return (
            <ul key={i} className="list-disc space-y-2 pl-6">
              {lines.map((l, j) => <li key={j}>{renderInline(l.replace(/^\s*[-*]\s+/, ''), `u${i}-${j}`)}</li>)}
            </ul>
          );
        if (lines.every((l) => /^\s*\d+[.)]\s+/.test(l)))
          return (
            <ol key={i} className="list-decimal space-y-2 pl-6">
              {lines.map((l, j) => <li key={j}>{renderInline(l.replace(/^\s*\d+[.)]\s+/, ''), `o${i}-${j}`)}</li>)}
            </ol>
          );
        if (lines.every((l) => l.startsWith('>')))
          return (
            <blockquote key={i} className="border-l-2 border-accent pl-4 italic text-foreground/80">
              {renderInline(lines.map((l) => l.replace(/^>\s?/, '')).join(' '), `q${i}`)}
            </blockquote>
          );
        // Heading followed by text in the same block
        if (/^#{1,4}\s+/.test(lines[0])) {
          return (
            <Fragment key={i}>
              <Markdown source={lines[0]} />
              <Markdown source={lines.slice(1).join('\n')} />
            </Fragment>
          );
        }
        return <p key={i}>{renderInline(lines.join(' '), `p${i}`)}</p>;
      })}
    </>
  );
};

export default Markdown;
