import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import articlesData from '../content/articles.json';
import { Calendar, ChevronLeft } from 'lucide-react';

export default function Articles() {
  return (
    <>
      <SEO title="المقالات التوعوية" description="مقالات ومعلومات قانونية عامة لزيادة الوعي القانوني." />
      
      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">المقالات التوعوية</h1>
          <div className="w-16 h-1 bg-secondary"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          
          <div className="bg-blue-50 border-r-4 border-blue-500 p-4 mb-12 rounded-l text-blue-900">
            <strong>تنويه هام:</strong> المحتوى المنشور في هذه الصفحة لأغراض التوعية القانونية العامة فقط، ولا يمثل استشارة قانونية ولا يُغني عن استشارة محامٍ متخصص بحالتك.
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {articlesData.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="p-6 md:p-8 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar size={16} />
                    <span>{new Date(article.date).toLocaleDateString('ar-EG')}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-primary line-clamp-2">{article.title}</h2>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="px-6 md:px-8 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
                  <Link to={`/articles/${article.id}`} className="text-secondary font-bold flex items-center gap-2 hover:text-primary transition-colors">
                    قراءة المقال
                    <ChevronLeft size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
