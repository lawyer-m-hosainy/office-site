import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import articlesDataRaw from '../content/articles.json';
import servicesData from '../content/services.json';
import { Calendar } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  relatedService?: string;
}

const articlesData = articlesDataRaw as Article[];

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = articlesData.find(a => a.id === id);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const relatedService = article.relatedService ? servicesData.find(s => s.id === article.relatedService) : null;

  return (
    <>
      <SEO title={article.title} description={article.excerpt} type="article" />
      
      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 mb-6 text-sm">
            <Link to="/articles" className="text-secondary hover:underline">المقالات</Link>
            <span className="text-gray-400">/</span>
            <span className="opacity-90 line-clamp-1">{article.title}</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">{article.title}</h1>
          <div className="flex items-center gap-2 text-background/80">
            <Calendar size={18} />
            <span>{new Date(article.date).toLocaleDateString('ar-EG')}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          
          <div className="bg-blue-50 border-r-4 border-blue-500 p-4 mb-12 rounded-l text-blue-900 text-sm">
            <strong>تنويه:</strong> المحتوى المنشور لأغراض التوعية القانونية العامة، ولا يمثل استشارة قانونية. يرجى استشارة محامٍ متخصص قبل اتخاذ أي إجراء قانوني.
          </div>

          <div className="prose prose-lg prose-headings:text-primary prose-a:text-secondary max-w-none text-gray-800 leading-loose">
            {article.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.includes('**', 2)) {
                 const endIdx = paragraph.indexOf('**', 2);
                 const boldText = paragraph.substring(2, endIdx);
                 const restText = paragraph.substring(endIdx + 2);
                 return <p key={index} className="mb-4"><strong>{boldText}</strong>{restText}</p>;
              }
              if (paragraph.match(/^\d+\./)) {
                return <p key={index} className="mb-2 mr-4 flex gap-2"><span className="font-bold text-secondary">{paragraph.split('.')[0]}.</span> {paragraph.substring(paragraph.indexOf('.') + 1).trim()}</p>
              }
              if (!paragraph.trim()) return null;
              return <p key={index} className="mb-6">{paragraph}</p>;
            })}
          </div>

          {relatedService && (
            <div className="mt-12 bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4 text-primary">هل تحتاج إلى استشارة في {relatedService.title}؟</h3>
              <p className="text-gray-600 mb-6">
                احصل على الدعم القانوني من خلال استشارة متخصصة لمساعدتك في اتخاذ القرارات الصحيحة.
              </p>
              <Link to={`/services/${relatedService.id}`} className="bg-primary text-secondary px-8 py-3 rounded-md font-bold text-lg hover:bg-opacity-90 transition-opacity inline-block">
                طلب استشارة الآن
              </Link>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
