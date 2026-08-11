import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import servicesData from '../content/services.json';
import siteData from '../content/site.json';
import * as Icons from 'lucide-react';
import heroImage from '../assets/images/hero_law_desk_1786480387485.jpg';

export default function Home() {
  return (
    <>
      <SEO />
      
      {/* Hero Section */}
      <section className="bg-background py-16 lg:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Right: Text Content */}
            <div className="text-text-main z-10 space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                تمثيل قانوني واضح <br className="hidden lg:block" />
                يحمي مصالحك.
              </h1>
              <p className="text-lg text-text-muted leading-relaxed max-w-lg">
                نقدم استشارات قانونية دقيقة وتمثيلاً قانونياً احترافياً يستند إلى دراسة وافية للوقائع، مع الالتزام التام بالشفافية وحفظ السرية.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/book" className="bg-primary text-white px-8 py-3.5 rounded-md font-bold text-lg hover:bg-opacity-90 transition-opacity text-center shadow-sm">
                  احجز استشارة
                </Link>
                <a href={siteData.whatsappLink} target="_blank" rel="noopener noreferrer" className="border-2 border-primary text-primary px-8 py-3.5 rounded-md font-bold text-lg hover:bg-primary/5 transition-colors text-center flex items-center justify-center gap-2">
                  <Icons.MessageCircle size={20} />
                  راسلنا عبر واتساب
                </a>
              </div>
            </div>

            {/* Left: Image with floating card */}
            <div className="relative z-10 lg:pl-4">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                {/* Subtle color overlay to keep it bright and warm */}
                <div className="absolute inset-0 bg-[#B88746]/10 mix-blend-multiply z-10"></div>
                <img src={heroImage} alt="مكتب محاماة" className="w-full h-[400px] lg:h-[500px] object-cover" />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 lg:-bottom-8 right-4 lg:-right-4 bg-surface px-8 py-4 rounded-xl shadow-lg border border-gray-100 z-20 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="font-bold text-primary text-sm sm:text-base">جنائي • مدني • أسرة • شركات</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">مجالات التخصص</h2>
              <p className="text-text-muted">خبرات قانونية متنوعة لخدمة قضاياك.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, index) => {
              const formattedNumber = String(index + 1).padStart(2, '0');
              return (
                <div key={service.id} className="group bg-surface p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-secondary/50 transition-all duration-300 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-1 h-0 bg-secondary group-hover:h-full transition-all duration-300"></div>
                  
                  <div className="text-secondary/20 text-5xl font-bold font-serif mb-4 group-hover:text-secondary/40 transition-colors">
                    {formattedNumber}
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-text-muted mb-4 text-sm leading-relaxed flex-grow">
                    {service.shortDescription}
                  </p>
                  
                  <Link to={`/services/${service.id}`} className="text-secondary font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all w-fit">
                    اقرأ المزيد
                    <Icons.ArrowLeft size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* New Section: Accurate Understanding */}
      <section className="py-16 bg-surface border-y border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-primary">استشارة تبدأ بفهم دقيق للقضية</h2>
            <p className="text-lg text-text-muted leading-relaxed">
              نؤمن بأن الحل القانوني السليم يبدأ من دراسة متأنية للوقائع والمستندات. نحن نعمل بشفافية تامة لتحديد المسار القانوني الأنسب، ونقدم المشورة بوضوح وموضوعية دون تقديم وعود بالنتائج التي تقع خارج نطاق المهنية.
            </p>
            <div className="pt-4">
              <a href={siteData.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-md font-bold text-lg hover:bg-opacity-90 transition-opacity shadow-sm">
                <Icons.MessageCircle size={22} />
                تواصل الآن للحصول على استشارة
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-2">منهجنا في العمل</h2>
            <p className="text-text-muted">نرتكز على قيم مهنية راسخة لضمان أفضل تمثيل قانوني.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: 'الدقة', icon: Icons.Target, desc: 'دراسة وافية للتفاصيل.' },
              { title: 'السرية', icon: Icons.ShieldCheck, desc: 'أمانة مهنية قصوى.' },
              { title: 'المتابعة', icon: Icons.Clock, desc: 'إطلاع دائم للموكل.' },
              { title: 'الوضوح', icon: Icons.Eye, desc: 'شفافية بلا وعود وهمية.' },
              { title: 'الالتزام', icon: Icons.Briefcase, desc: 'تكريس الجهود للدفاع.' }
            ].map((item, index) => {
              const IconComp = item.icon;
              return (
                <div key={index} className="bg-surface p-6 rounded-xl border border-gray-100 text-center flex flex-col items-center gap-3 hover:border-secondary/30 transition-colors shadow-sm">
                  <div className="text-secondary bg-background p-3 rounded-full">
                    <IconComp size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-bold text-primary text-lg">{item.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
