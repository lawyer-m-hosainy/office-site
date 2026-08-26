import React from 'react';
import SEO from '../components/SEO';
import aboutData from '../content/about.json';
import { User, Award, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <>
      <SEO title="من نحن" description="نبذة عن مكتب محمد السيد الحسيني للمحاماة ورؤيتنا وقيمنا." />
      
      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">من نحن</h1>
          <div className="w-16 h-1 bg-secondary"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-primary">عن المكتب</h2>
            <p className="text-lg leading-relaxed text-gray-700">{aboutData.intro}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-50 p-8 rounded-lg border-t-4 border-secondary">
              <h2 className="text-xl font-bold mb-4 text-primary flex items-center gap-3">
                <Award className="text-secondary" /> الرؤية
              </h2>
              <p className="leading-relaxed text-gray-700">{aboutData.vision}</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg border-t-4 border-secondary">
              <h2 className="text-xl font-bold mb-4 text-primary flex items-center gap-3">
                <BookOpen className="text-secondary" /> الرسالة
              </h2>
              <p className="leading-relaxed text-gray-700">{aboutData.mission}</p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-primary">قيمنا المهنية</h2>
            <ul className="space-y-4">
              {aboutData.values.map((value, index) => (
                <li key={index} className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded shadow-sm">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0"></div>
                  <span className="text-lg text-gray-700">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary text-background p-8 lg:p-12 rounded-xl flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative isolate w-32 h-32 md:w-48 md:h-48 bg-gray-200 rounded-full shrink-0 overflow-hidden border-4 border-secondary flex items-center justify-center text-gray-400">
              {/* Lawyer Image Placeholder - will fall back to icon if image not found */}
              <img src="/lawyer.jpg" alt={aboutData.lawyerName} className="w-full h-full object-cover" onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('bg-white');
              }} />
              <User size={64} className="absolute z-[-1]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-2">{aboutData.lawyerName}</h2>
              <h3 className="text-xl mb-6 opacity-90">{aboutData.lawyerTitle}</h3>
              <p className="leading-relaxed opacity-90 text-lg">
                {aboutData.lawyerBio}
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
