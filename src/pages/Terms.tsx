import SEO from '../components/SEO';
import siteData from '../content/site.json';
import { formatArabicDate } from '../lib/date';

export default function Terms() {
  return (
    <>
      <SEO
        breadcrumbs={[
          { name: 'الرئيسية', path: '/' },
          { name: 'شروط الاستخدام', path: '/terms' },
        ]}
      />

      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">شروط الاستخدام</h1>
          <div className="w-16 h-1 bg-secondary" aria-hidden="true"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto prose prose-lg prose-headings:text-primary prose-a:text-secondary text-gray-700 leading-loose">
          <p>
            مرحباً بك في موقع "مكتب محمد السيد الحسيني للمحاماة". باستخدامك لهذا الموقع، فإنك توافق
            على الشروط والأحكام التالية:
          </p>

          <h2>1. طبيعة المحتوى</h2>
          <p>
            جميع المعلومات والمقالات المنشورة على هذا الموقع هي لأغراض المعلومات العامة والتوعية
            القانونية فقط. <strong>لا يشكل هذا المحتوى استشارة قانونية</strong> ولا ينبغي الاعتماد
            عليه لاتخاذ قرارات أو اتخاذ أي إجراء قانوني دون استشارة محامٍ متخصص بناءً على تفاصيل
            حالتك الفردية.
          </p>

          <h2>2. عدم وجود علاقة موكل ومحامٍ</h2>
          <p>
            إن تصفحك للموقع، أو إرسالك لرسالة إلكترونية، أو تعبئتك لنموذج حجز استشارة لا ينشئ بحد
            ذاته علاقة وكالة أو تعاقد (محامٍ وموكل) بينك وبين مكتبنا، ما لم يتم إبرام اتفاق كتابي
            صريح بذلك.
          </p>

          <h2>3. حقوق الملكية الفكرية</h2>
          <p>
            جميع حقوق الملكية الفكرية المرتبطة بتصميم الموقع، النصوص، والشعارات مملوكة لمكتب محمد
            السيد الحسيني للمحاماة. يُحظر نسخ أو نقل أو إعادة استخدام أي محتوى دون إذن كتابي مسبق.
          </p>

          <h2>4. إخلاء المسؤولية عن الروابط الخارجية</h2>
          <p>
            قد يحتوي الموقع على روابط لجهات خارجية. نحن غير مسؤولين عن محتوى تلك المواقع أو سياسات
            الخصوصية الخاصة بها.
          </p>

          <h2>5. التعديلات</h2>
          <p>
            يحتفظ المكتب بحق تعديل هذه الشروط في أي وقت دون إشعار مسبق. يُعتبر استمرارك في استخدام
            الموقع بعد أي تعديلات بمثابة موافقة عليها.
          </p>

          <p className="text-sm text-text-muted">
            آخر تحديث: {formatArabicDate(siteData.legalLastUpdated)}
          </p>
        </div>
      </div>
    </>
  );
}
