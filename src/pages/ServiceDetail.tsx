import { useParams, Link } from 'react-router';
import SEO from '../components/SEO';
import servicesData from '../content/services.json';
import siteData from '../content/site.json';
import { MessageCircle, getServiceIcon } from '../lib/icons';
import { trackLead } from '../lib/analytics';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const service = servicesData.find((s) => s.id === id);

  if (!service) {
    return (
      <NotFound
        title="الخدمة غير موجودة"
        message="الخدمة التي تبحث عنها غير متاحة أو تم تغيير رابطها. يمكنك تصفح كل الخدمات القانونية التي يقدمها المكتب."
      />
    );
  }

  const Icon = getServiceIcon(service.icon);

  return (
    <>
      <SEO
        title={service.title}
        description={`${service.shortDescription} — مكتب الحسيني للمحاماة بالمنصورة.`}
        breadcrumbs={[
          { name: 'الرئيسية', path: '/' },
          { name: 'الخدمات', path: '/services' },
          { name: service.title, path: `/services/${service.id}` },
        ]}
      />

      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-3 mb-6 text-sm flex-wrap" aria-label="مسار التنقل">
            <Link to="/services" className="text-secondary hover:underline">
              الخدمات
            </Link>
            <span className="text-gray-500" aria-hidden="true">
              /
            </span>
            <span className="text-text-muted">{service.title}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">{service.title}</h1>
          <div className="w-16 h-1 bg-secondary" aria-hidden="true"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 md:p-12 rounded-xl shadow-sm border border-gray-100 mb-12">
            <div className="text-secondary mb-8">
              <Icon size={64} aria-hidden="true" />
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 leading-loose whitespace-pre-wrap">
              {service.description}
            </div>
          </div>

          <div className="bg-gray-50 p-6 md:p-8 rounded-lg text-center border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              هل تحتاج إلى استشارة في {service.title}؟
            </h2>
            <p className="text-gray-600 mb-4">
              نحن هنا لتقديم المشورة القانونية والدعم اللازم لحماية حقوقك.
            </p>
            <p className="text-secondary font-semibold mb-8 text-sm bg-secondary/10 inline-block px-4 py-2 rounded-full">
              * {siteData.feesNote}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={siteData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLead('whatsapp', `service_${service.id}`)}
                className="bg-whatsapp text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-whatsapp/90 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={24} aria-hidden="true" />
                تواصل عبر واتساب
              </a>
              <Link
                to="/book"
                className="bg-primary text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-primary/90 transition-colors"
              >
                احجز موعداً
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
