import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import servicesData from '../content/services.json';
import siteData from '../content/site.json';
import {
  ArrowLeft,
  Briefcase,
  Clock,
  Eye,
  MessageCircle,
  ShieldCheck,
  Target,
} from '../lib/icons';
import { trackLead } from '../lib/analytics';

// Served from /public so the prerendered HTML and the client bundle agree on the URL.
const heroImage = '/brand/hero-office.jpg';

const approach = [
  { title: 'الدقة', icon: Target, desc: 'دراسة وافية للتفاصيل.' },
  { title: 'السرية', icon: ShieldCheck, desc: 'أمانة مهنية قصوى.' },
  { title: 'المتابعة', icon: Clock, desc: 'إطلاع دائم للموكل.' },
  { title: 'الوضوح', icon: Eye, desc: 'شفافية بلا وعود وهمية.' },
  { title: 'الالتزام', icon: Briefcase, desc: 'تكريس الجهود للدفاع.' },
];

export default function Home() {
  return (
    <>
      <SEO />

      <section className="bg-background py-16 lg:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-text-main z-10 space-y-6">
              <p className="text-secondary font-bold">{siteData.tagline}</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                محامٍ بالمنصورة — تمثيل قانوني واضح يحمي مصالحك.
              </h1>
              <p className="text-lg text-text-muted leading-relaxed max-w-lg">
                نقدم استشارات قانونية دقيقة وتمثيلاً قانونياً احترافياً يستند إلى دراسة وافية للوقائع،
                مع الالتزام التام بالشفافية وحفظ السرية.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/book"
                  className="bg-primary text-white px-8 py-3.5 rounded-md font-bold text-lg hover:bg-primary/90 transition-colors text-center shadow-sm"
                >
                  احجز استشارة
                </Link>
                <a
                  href={siteData.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLead('whatsapp', 'home_hero')}
                  className="border-2 border-primary text-primary px-8 py-3.5 rounded-md font-bold text-lg hover:bg-primary/5 transition-colors text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} aria-hidden="true" />
                  راسلنا عبر واتساب
                </a>
              </div>
              <p className="text-sm text-text-muted pt-2">{siteData.responseTime}.</p>
            </div>

            <div className="relative z-10 lg:pe-4">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <div className="absolute inset-0 bg-secondary-bright/10 mix-blend-multiply z-10"></div>
                <img
                  src={heroImage}
                  alt="مكتب محاماة"
                  width={1376}
                  height={768}
                  fetchPriority="high"
                  className="w-full h-[320px] sm:h-[400px] lg:h-[500px] object-cover"
                />
              </div>

              <div className="absolute -bottom-6 lg:-bottom-8 start-4 lg:-start-4 bg-surface px-4 sm:px-8 py-4 rounded-xl shadow-lg border border-gray-100 z-20 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary" aria-hidden="true"></div>
                <span className="font-bold text-primary text-xs sm:text-base">
                  جنائي • مدني • أسرة • شركات
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">مجالات التخصص</h2>
              <p className="text-text-muted">خبرات قانونية متنوعة لخدمة قضاياك.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                className="group bg-surface p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-secondary/50 transition-all duration-300 flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 start-0 w-1 h-0 bg-secondary group-hover:h-full transition-all duration-300"></div>

                <div
                  aria-hidden="true"
                  className="text-secondary/25 text-5xl font-bold font-serif mb-4 group-hover:text-secondary/40 transition-colors"
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-text-muted mb-4 text-sm leading-relaxed flex-grow">
                  {service.shortDescription}
                </p>

                <Link
                  to={`/services/${service.id}`}
                  className="text-secondary font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all w-fit"
                >
                  اقرأ المزيد
                  <ArrowLeft size={14} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface border-y border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-primary">استشارة تبدأ بفهم دقيق للقضية</h2>
            <p className="text-lg text-text-muted leading-relaxed">
              نؤمن بأن الحل القانوني السليم يبدأ من دراسة متأنية للوقائع والمستندات. نحن نعمل بشفافية
              تامة لتحديد المسار القانوني الأنسب، ونقدم المشورة بوضوح وموضوعية دون تقديم وعود بالنتائج
              التي تقع خارج نطاق المهنية.
            </p>
            <p className="text-secondary font-semibold bg-secondary/10 inline-block px-5 py-2 rounded-full text-sm">
              {siteData.feesNote}
            </p>
            <div className="pt-4">
              <a
                href={siteData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLead('whatsapp', 'home_mid')}
                className="inline-flex items-center gap-2 bg-whatsapp text-white px-8 py-3.5 rounded-md font-bold text-lg hover:bg-whatsapp/90 transition-colors shadow-sm"
              >
                <MessageCircle size={22} aria-hidden="true" />
                تواصل الآن للحصول على استشارة
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-2">منهجنا في العمل</h2>
            <p className="text-text-muted">نرتكز على قيم مهنية راسخة لضمان أفضل تمثيل قانوني.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {approach.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-surface p-6 rounded-xl border border-gray-100 text-center flex flex-col items-center gap-3 hover:border-secondary/30 transition-colors shadow-sm"
                >
                  <div className="text-secondary bg-background p-3 rounded-full">
                    <IconComp size={24} strokeWidth={2.5} aria-hidden="true" />
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
