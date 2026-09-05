import { Link } from 'react-router';
import SEO from '../components/SEO';

interface Props {
  title?: string;
  message?: string;
}

export default function NotFound({
  title = 'عذراً، الصفحة غير موجودة',
  message = 'الرابط الذي تحاول الوصول إليه غير متاح أو تم نقله. يمكنك العودة إلى الرئيسية أو تصفح خدماتنا القانونية.',
}: Props) {
  return (
    <>
      <SEO title="الصفحة غير موجودة" noindex />

      <div className="container mx-auto px-4 lg:px-8 py-24 text-center">
        <p className="text-secondary font-bold text-lg mb-2">404</p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-primary">{title}</h1>
        <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">{message}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="bg-primary text-white px-8 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors"
          >
            العودة إلى الرئيسية
          </Link>
          <Link
            to="/services"
            className="border-2 border-primary text-primary px-8 py-3 rounded-md font-bold hover:bg-primary/5 transition-colors"
          >
            تصفح الخدمات
          </Link>
        </div>
      </div>
    </>
  );
}
