import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="الصفحة غير موجودة" description="الصفحة التي تبحث عنها غير موجودة." />

      <div className="container mx-auto px-4 lg:px-8 py-24 text-center">
        <p className="text-secondary font-bold text-lg mb-2">404</p>
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-primary">
          عذراً، الصفحة غير موجودة
        </h1>
        <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
          الرابط الذي تحاول الوصول إليه غير متاح أو تم نقله. يمكنك العودة إلى الرئيسية أو تصفح خدماتنا القانونية.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="bg-primary text-white px-8 py-3 rounded-md font-bold hover:bg-opacity-90 transition-opacity">
            العودة إلى الرئيسية
          </Link>
          <Link to="/services" className="border-2 border-primary text-primary px-8 py-3 rounded-md font-bold hover:bg-primary/5 transition-colors">
            تصفح الخدمات
          </Link>
        </div>
      </div>
    </>
  );
}
