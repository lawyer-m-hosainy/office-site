import { useState } from 'react';
import SEO from '../components/SEO';
import aboutData from '../content/about.json';
import { Award, BookOpen, User } from '../lib/icons';

export default function About() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <>
      <SEO
        breadcrumbs={[
          { name: 'الرئيسية', path: '/' },
          { name: 'من نحن', path: '/about' },
        ]}
      />

      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">من نحن</h1>
          <div className="w-16 h-1 bg-secondary" aria-hidden="true"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-primary">عن المكتب</h2>
            <p className="text-lg leading-relaxed text-gray-700">{aboutData.intro}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <div className="bg-gray-50 p-8 rounded-lg border-t-4 border-secondary">
              <h2 className="text-xl font-bold mb-4 text-primary flex items-center gap-3">
                <Award className="text-secondary" aria-hidden="true" /> الرؤية
              </h2>
              <p className="leading-relaxed text-gray-700">{aboutData.vision}</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border-t-4 border-secondary">
              <h2 className="text-xl font-bold mb-4 text-primary flex items-center gap-3">
                <BookOpen className="text-secondary" aria-hidden="true" /> الرسالة
              </h2>
              <p className="leading-relaxed text-gray-700">{aboutData.mission}</p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-primary">قيمنا المهنية</h2>
            <ul className="space-y-4">
              {aboutData.values.map((value, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded shadow-sm"
                >
                  <div
                    className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0"
                    aria-hidden="true"
                  ></div>
                  <span className="text-lg text-gray-700">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary text-background p-8 lg:p-12 rounded-xl flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full shrink-0 overflow-hidden border-4 border-secondary-bright bg-background/10 flex items-center justify-center">
              {photoFailed || !aboutData.lawyerPhoto ? (
                <span role="img" aria-label={aboutData.lawyerName} className="text-background/70">
                  <User size={64} aria-hidden="true" />
                </span>
              ) : (
                <img
                  src={aboutData.lawyerPhoto}
                  alt={aboutData.lawyerName}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  onError={() => setPhotoFailed(true)}
                />
              )}
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-bright mb-2">
                {aboutData.lawyerName}
              </h2>
              <p className="text-xl mb-6 text-background/90">{aboutData.lawyerTitle}</p>
              <p className="leading-relaxed text-background/90 text-lg">{aboutData.lawyerBio}</p>

              {aboutData.credentials.length > 0 && (
                <ul className="mt-6 space-y-2 text-background/90">
                  {aboutData.credentials.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-secondary-bright" aria-hidden="true">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
