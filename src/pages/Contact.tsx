import React from 'react';
import SEO from '../components/SEO';
import siteData from '../content/site.json';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <SEO title="تواصل معنا" description="طرق التواصل مع مكتب محمد السيد الحسيني للمحاماة، مواعيد العمل، والعنوان." />
      
      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">تواصل معنا</h1>
          <div className="w-16 h-1 bg-secondary"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          
          <div>
            <h2 className="text-2xl font-bold mb-8 text-primary">معلومات الاتصال</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="bg-gray-100 p-4 rounded-full text-secondary shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">رقم الهاتف / واتساب</h3>
                  <a href={siteData.whatsappLink} className="text-gray-600 hover:text-secondary block dir-ltr text-right" dir="ltr">{siteData.whatsapp}</a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-gray-100 p-4 rounded-full text-secondary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">البريد الإلكتروني</h3>
                  <a href={`mailto:${siteData.email}`} className="text-gray-600 hover:text-secondary block">{siteData.email}</a>
                </div>
              </div>

              {siteData.address && (
                <div className="flex gap-4 items-start">
                  <div className="bg-gray-100 p-4 rounded-full text-secondary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">العنوان</h3>
                    <p className="text-gray-600">{siteData.address}</p>
                  </div>
                </div>
              )}

              {siteData.workingHours && (
                <div className="flex gap-4 items-start">
                  <div className="bg-gray-100 p-4 rounded-full text-secondary shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">ساعات العمل</h3>
                    <p className="text-gray-600 whitespace-pre-line">{siteData.workingHours}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-12">
              <a href={siteData.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded font-bold hover:bg-opacity-90 transition-opacity shadow-sm">
                <MessageCircle size={20} />
                محادثة مباشرة عبر واتساب
              </a>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 h-full min-h-[300px] flex items-center justify-center flex-col text-center">
            {siteData.mapLink ? (
              <p className="text-gray-500 mb-4">يمكن إضافة خريطة جوجل هنا لاحقاً عبر التضمين (Embed) إذا تم تحديد الموقع.</p>
            ) : (
               <>
                 <MapPin size={48} className="text-gray-300 mb-4" />
                 <p className="text-gray-500 max-w-xs text-lg leading-relaxed">موقع المكتب على الخريطة سيتم إضافته قريباً بعد تحديد العنوان بالتفصيل.</p>
               </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
