import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import SEO from '../components/SEO';
import servicesData from '../content/services.json';
import { articles, readingMinutes } from '../lib/articles';
import { formatArabicDate } from '../lib/date';
import { Calendar, ChevronLeft, Clock, Search } from '../lib/icons';

const ALL = 'all';

export default function Articles() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>(ALL);

  const filtered = useMemo(() => {
    const q = query.trim();
    return articles.filter((article) => {
      const matchesCategory = category === ALL || article.relatedService === category;
      const matchesQuery =
        q === '' ||
        article.title.includes(q) ||
        article.excerpt.includes(q) ||
        article.content.includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <SEO
        breadcrumbs={[
          { name: 'الرئيسية', path: '/' },
          { name: 'المقالات التوعوية', path: '/articles' },
        ]}
      />

      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">المقالات التوعوية</h1>
          <div className="w-16 h-1 bg-secondary" aria-hidden="true"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-blue-50 border-s-4 border-blue-600 p-4 mb-10 rounded-e text-blue-900">
            <strong>تنويه هام:</strong> المحتوى المنشور في هذه الصفحة لأغراض التوعية القانونية العامة
            فقط، ولا يمثل استشارة قانونية ولا يُغني عن استشارة محامٍ متخصص بحالتك.
          </div>

          <div className="mb-8 flex flex-col gap-4">
            <div className="relative">
              <label htmlFor="article-search" className="sr-only">
                ابحث في المقالات
              </label>
              <Search
                className="absolute top-1/2 -translate-y-1/2 start-4 text-gray-400"
                size={20}
                aria-hidden="true"
              />
              <input
                id="article-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث عن موضوع… مثال: النفقة، الشيك، الميراث"
                className="w-full ps-12 pe-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="تصفية حسب المجال">
              <button
                type="button"
                onClick={() => setCategory(ALL)}
                aria-pressed={category === ALL}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  category === ALL
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-text-muted border-gray-300 hover:border-secondary'
                }`}
              >
                كل المقالات
              </button>
              {servicesData.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setCategory(service.id)}
                  aria-pressed={category === service.id}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    category === service.id
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-text-muted border-gray-300 hover:border-secondary'
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-text-muted mb-6" role="status" aria-live="polite">
            {filtered.length > 0
              ? `عدد المقالات المعروضة: ${filtered.length}`
              : 'لا توجد مقالات مطابقة لبحثك.'}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-text-muted mb-6">
                جرّب كلمة بحث أخرى، أو تصفح كل المقالات، أو راسلنا بسؤالك مباشرة.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory(ALL);
                }}
                className="bg-primary text-white px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors"
              >
                عرض كل المقالات
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filtered.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="p-6 md:p-8 flex-grow">
                    <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} aria-hidden="true" />
                        {formatArabicDate(article.date)}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={16} aria-hidden="true" />
                        {readingMinutes(article.content)} دقائق قراءة
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-primary line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="px-6 md:px-8 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
                    <Link
                      to={`/articles/${article.id}`}
                      className="text-secondary font-bold flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      قراءة المقال
                      <ChevronLeft size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
