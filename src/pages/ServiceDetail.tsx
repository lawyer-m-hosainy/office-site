import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import servicesData from '../content/services.json';
import siteData from '../content/site.json';
import * as Icons from 'lucide-react';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const service = servicesData.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = (Icons as any)[service.icon] || Icons.HelpCircle;

  return (
    <>
      <SEO title={service.title} description={service.shortDescription} />
      
      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/services" className="text-secondary hover:underline">الخدمات</Link>
            <span className="text-gray-400">/</span>
            <span className="opacity-90">{service.title}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-primary">{service.title}</h1>
          <div className="w-16 h-1 bg-secondary"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 mb-12">
            <div className="text-secondary mb-8">
              <Icon size={64} />
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-loose whitespace-pre-wrap">
              {service.description}
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg text-center border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-primary">هل تحتاج إلى استشارة في {service.title}؟</h3>
            <p className="text-gray-600 mb-4">
              نحن هنا لتقديم المشورة القانونية والدعم اللازم لحماية حقوقك.
            </p>
            <p className="text-secondary font-semibold mb-8 text-sm bg-secondary/10 inline-block px-4 py-2 rounded-full">
              * يتم تحديد المقابل المادي للاستشارة أو الخدمة بعد تقييم أولي لحالة القضية.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={siteData.whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Icons.MessageCircle size={24} />
                تواصل عبر واتساب
              </a>
              <Link to="/book" className="bg-primary text-secondary px-8 py-3 rounded-md font-bold text-lg hover:bg-opacity-90 transition-opacity">
                احجز موعداً
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
