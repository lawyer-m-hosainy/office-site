import { Link } from 'react-router';
import SEO from '../components/SEO';
import servicesData from '../content/services.json';
import { getServiceIcon } from '../lib/icons';

export default function Services() {
  return (
    <>
      <SEO
        breadcrumbs={[
          { name: 'الرئيسية', path: '/' },
          { name: 'الخدمات القانونية', path: '/services' },
        ]}
      />

      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">الخدمات القانونية</h1>
          <div className="w-16 h-1 bg-secondary" aria-hidden="true"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {servicesData.map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <div
                key={service.id}
                className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="bg-gray-50 p-6 rounded-lg text-secondary shrink-0">
                  <Icon size={48} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-primary">{service.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">{service.description}</p>
                  <div className="flex gap-4">
                    <Link
                      to={`/services/${service.id}`}
                      className="text-primary font-bold hover:text-secondary transition-colors underline underline-offset-4"
                    >
                      التفاصيل
                    </Link>
                    <Link
                      to="/book"
                      className="text-secondary font-bold hover:text-primary transition-colors underline underline-offset-4"
                    >
                      طلب استشارة
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
