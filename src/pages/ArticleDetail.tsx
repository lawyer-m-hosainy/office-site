import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ArticleBody from '../components/ArticleBody';
import siteData from '../content/site.json';
import { getArticle, getServiceTitle, readingMinutes, relatedArticles } from '../lib/articles';
import { formatArabicDate } from '../lib/date';
import { Calendar, ChevronLeft, Clock, Share2 } from '../lib/icons';
import { trackEvent, trackLead } from '../lib/analytics';
import NotFound from './NotFound';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = getArticle(id);

  if (!article) {
    return (
      <NotFound
        title="المقال غير موجود"
        message="المقال الذي تبحث عنه غير متاح أو تم تغيير رابطه. يمكنك تصفح باقي المقالات القانونية."
      />
    );
  }

  const relatedServiceTitle = getServiceTitle(article.relatedService);
  const related = relatedArticles(article);
  const articleUrl = `${siteData.domain}/articles/${article.id}`;
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${article.title}\n${articleUrl}`)}`;

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        type="article"
        publishedAt={article.date}
        breadcrumbs={[
          { name: 'الرئيسية', path: '/' },
          { name: 'المقالات', path: '/articles' },
          { name: article.title, path: `/articles/${article.id}` },
        ]}
      />

      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-3 mb-6 text-sm flex-wrap" aria-label="مسار التنقل">
            <Link to="/articles" className="text-secondary hover:underline">
              المقالات
            </Link>
            <span className="text-gray-500" aria-hidden="true">
              /
            </span>
            <span className="text-text-muted line-clamp-1">{article.title}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6 leading-tight text-primary">
            {article.title}
          </h1>
          <div className="flex items-center flex-wrap gap-5 text-text-muted">
            <span className="flex items-center gap-2">
              <Calendar size={18} aria-hidden="true" />
              {formatArabicDate(article.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={18} aria-hidden="true" />
              {readingMinutes(article.content)} دقائق قراءة
            </span>
            {relatedServiceTitle && (
              <Link
                to={`/services/${article.relatedService}`}
                className="text-secondary font-semibold hover:underline"
              >
                {relatedServiceTitle}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 border-s-4 border-blue-600 p-4 mb-12 rounded-e text-blue-900 text-sm">
            <strong>تنويه:</strong> المحتوى المنشور لأغراض التوعية القانونية العامة، ولا يمثل استشارة
            قانونية. يرجى استشارة محامٍ متخصص قبل اتخاذ أي إجراء قانوني.
          </div>

          <ArticleBody content={article.content} />

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-gray-200 pt-8">
            <span className="font-semibold text-text-muted">هل استفدت من المقال؟ شاركه:</span>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('share', { method: 'whatsapp', item_id: article.id })}
              className="inline-flex items-center gap-2 bg-whatsapp text-white px-5 py-2.5 rounded-md font-bold hover:bg-whatsapp/90 transition-colors"
            >
              <Share2 size={18} aria-hidden="true" />
              مشاركة على واتساب
            </a>
          </div>

          <div className="mt-12 bg-gray-50 border border-gray-200 p-6 md:p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {relatedServiceTitle
                ? `هل تحتاج إلى استشارة في ${relatedServiceTitle}؟`
                : 'هل تحتاج إلى استشارة قانونية؟'}
            </h2>
            <p className="text-gray-600 mb-6">
              احصل على الدعم القانوني من خلال استشارة متخصصة لمساعدتك في اتخاذ القرارات الصحيحة.
              {' '}
              {siteData.responseTime}.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/book"
                onClick={() => trackLead('form', `article_${article.id}`)}
                className="bg-primary text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-primary/90 transition-colors"
              >
                احجز استشارة الآن
              </Link>
              {article.relatedService && (
                <Link
                  to={`/services/${article.relatedService}`}
                  className="border-2 border-primary text-primary px-8 py-3 rounded-md font-bold text-lg hover:bg-primary/5 transition-colors"
                >
                  تفاصيل الخدمة
                </Link>
              )}
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-primary mb-6">مقالات قد تهمك أيضاً</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/articles/${item.id}`}
                      className="group flex items-start gap-3 h-full bg-white border border-gray-200 rounded-lg p-5 hover:border-secondary hover:shadow-sm transition-all"
                    >
                      <ChevronLeft
                        size={18}
                        className="text-secondary shrink-0 mt-1 group-hover:-translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                      <span className="font-semibold text-primary leading-relaxed">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
