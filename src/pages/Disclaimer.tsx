import SEO from '../components/SEO';
import siteData from '../content/site.json';
import { formatArabicDate } from '../lib/date';

export default function Disclaimer() {
  return (
    <>
      <SEO
        breadcrumbs={[
          { name: 'الرئيسية', path: '/' },
          { name: 'إخلاء المسؤولية', path: '/disclaimer' },
        ]}
      />

      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">إخلاء المسؤولية</h1>
          <div className="w-16 h-1 bg-secondary" aria-hidden="true"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto prose prose-lg prose-headings:text-primary prose-a:text-secondary text-gray-700 leading-loose">
          <p>
            يُرجى قراءة إخلاء المسؤولية هذا بعناية قبل استخدام موقع "مكتب محمد السيد الحسيني
            للمحاماة":
          </p>

          <h2>المعلومات العامة</h2>
          <p>
            صُمم هذا الموقع لتقديم معلومات عامة عن المكتب والخدمات التي يقدمها، بالإضافة إلى توفير
            مقالات توعوية في مجالات قانونية متنوعة.
          </p>

          <h2>ليست استشارة قانونية</h2>
          <p>
            المحتوى المنشور ليس، ولا يجب اعتباره، استشارة قانونية رسمية. تختلف القوانين باختلاف
            الظروف الخاصة بكل قضية وتخضع للتعديلات المستمرة، لذا لا يجوز الاعتماد على أي مقال أو نص
            في الموقع كبديل عن الحصول على استشارة قانونية متخصصة.
          </p>

          <h2>النتائج غير مضمونة</h2>
          <p>
            لا توجد أي وعود أو ضمانات بتحقيق نتائج معينة في أي قضية أو نزاع قانوني. كل قضية فريدة من
            نوعها وتعتمد نتيجتها على الوقائع والأدلة والتشريعات المطبقة، ولا يضمن المكتب الفوز بأي
            قضية، وذلك التزاماً بأصول وآداب مهنة المحاماة.
          </p>

          <h2>السرية في المراسلات المبدئية</h2>
          <p>
            نرجو عدم إرسال أي معلومات سرية أو حساسة جداً عبر النماذج المفتوحة بالموقع قبل تأكيد
            التواصل معكم وقبولنا لتمثيلكم رسمياً، لضمان تمتع تلك المعلومات بحصانة علاقة الموكل
            والمحامي.
          </p>

          <p className="text-sm text-text-muted">
            آخر تحديث: {formatArabicDate(siteData.legalLastUpdated)}
          </p>
        </div>
      </div>
    </>
  );
}
