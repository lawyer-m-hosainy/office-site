import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import faqData from '../content/faq.json';
import siteData from '../content/site.json';
import { ChevronDown, MessageCircle } from '../lib/icons';
import { trackLead } from '../lib/analytics';

const ALL = 'all';

function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id ?? null);
  const [category, setCategory] = useState<string>(ALL);

  const categories = useMemo(
    () => Array.from(new Set(faqData.map((item) => item.category))),
    []
  );

  const visible = useMemo(
    () => (category === ALL ? faqData : faqData.filter((item) => item.category === category)),
    [category]
  );

  return (
    <>
      <SEO
        schema={buildFaqSchema()}
        breadcrumbs={[
          { name: 'الرئيسية', path: '/' },
          { name: 'أسئلة قانونية شائعة', path: '/faq' },
        ]}
      />

      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">أسئلة قانونية شائعة</h1>
          <div className="w-16 h-1 bg-secondary" aria-hidden="true"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 border-s-4 border-blue-600 p-4 mb-10 rounded-e text-blue-900 text-sm">
            <strong>تنويه:</strong> الإجابات هنا عامة لأغراض التوعية القانونية، وتختلف النتيجة
            باختلاف وقائع كل حالة. لا تعتمد عليها كبديل عن استشارة قانونية خاصة بحالتك.
          </div>

          <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="تصفية حسب المجال">
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
              كل الأسئلة
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  category === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-text-muted border-gray-300 hover:border-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <ul className="space-y-3">
            {visible.map((item) => {
              const isOpen = openId === item.id;
              return (
                <li
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <h2>
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                      className="w-full flex items-center justify-between gap-4 text-start px-5 py-4 font-bold text-primary hover:bg-gray-50 transition-colors"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        size={20}
                        aria-hidden="true"
                        className={`shrink-0 text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </h2>
                  <div
                    id={`faq-answer-${item.id}`}
                    hidden={!isOpen}
                    className="px-5 pb-5 text-gray-700 leading-loose"
                  >
                    {item.answer}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 bg-gray-50 border border-gray-200 p-6 md:p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-primary">لم تجد إجابة سؤالك؟</h2>
            <p className="text-gray-600 mb-6">
              أرسل سؤالك مباشرة وسنوضح لك موقفك القانوني. {siteData.responseTime}.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={siteData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLead('whatsapp', 'faq_page')}
                className="bg-whatsapp text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-whatsapp/90 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={22} aria-hidden="true" />
                اسأل عبر واتساب
              </a>
              <Link
                to="/book"
                className="bg-primary text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-primary/90 transition-colors"
              >
                احجز استشارة
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
