import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticleBody from '../ArticleBody';
import { articles } from '../../lib/articles';

describe('ArticleBody', () => {
  it('renders "## " lines as second-level headings', () => {
    render(<ArticleBody content={'## أولاً: الهبة العقارية\nنص الفقرة.'} />);
    expect(screen.getByRole('heading', { level: 2, name: 'أولاً: الهبة العقارية' })).toBeInTheDocument();
  });

  it('renders "### " lines as third-level headings', () => {
    render(<ArticleBody content={'### عنوان فرعي\nنص.'} />);
    expect(screen.getByRole('heading', { level: 3, name: 'عنوان فرعي' })).toBeInTheDocument();
  });

  it('renders bold anywhere in a line, not only at its start', () => {
    render(<ArticleBody content={'الملكية العقارية **لا تنتقل إلا بالتسجيل** في القانون المصري.'} />);
    const bold = screen.getByText('لا تنتقل إلا بالتسجيل');
    expect(bold.tagName).toBe('STRONG');
    expect(bold.parentElement?.textContent).toContain('في القانون المصري.');
  });

  it('renders bold inside bullets and numbered items', () => {
    render(
      <ArticleBody content={'- **خطر البطلان:** الهبة العرفية باطلة.\n1. **قرينة الحيازة:** يواصل الأب الإقامة.'} />
    );
    expect(screen.getByText('خطر البطلان:').tagName).toBe('STRONG');
    expect(screen.getByText('قرينة الحيازة:').tagName).toBe('STRONG');
    expect(screen.getByText('1.')).toBeInTheDocument();
  });

  it('leaves stray asterisks alone', () => {
    render(<ArticleBody content={'قيمة الرسم ** غير محددة'} />);
    expect(screen.getByText(/قيمة الرسم \*\* غير محددة/)).toBeInTheDocument();
  });

  it('skips blank lines', () => {
    const { container } = render(<ArticleBody content={'فقرة أولى.\n\n\nفقرة ثانية.'} />);
    expect(container.querySelectorAll('p')).toHaveLength(2);
  });

  it('never leaves unrendered markdown markers in any published article', () => {
    for (const article of articles) {
      const { container, unmount } = render(<ArticleBody content={article.content} />);
      expect(container.textContent, article.id).not.toContain('**');
      expect(container.textContent, article.id).not.toMatch(/^##\s/m);
      unmount();
    }
  });
});
