import React from 'react';
import SEO from '../components/SEO';

export default function Disclaimer() {
  return (
    <>
      <SEO title="إخلاء المسؤولية" description="إخلاء مسؤولية حول المحتوى القانوني بالموقع." />
      
      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">إخلاء المسؤولية</h1>
          <div className="w-16 h-1 bg-secondary"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto prose prose-lg prose-headings:text-primary prose-a:text-secondary text-gray-700 leading-loose">
          <p>يُرجى قراءة إخلاء المسؤولية هذا بعناية قبل استخدام موقع "مكتب محمد السيد الحسيني للمحاماة":</p>

          <ul>
            <li className="mb-4"><strong>المعلومات العامة:</strong> صُمم هذا الموقع لتقديم معلومات عامة عن المكتب والخدمات التي يقدمها، بالإضافة إلى توفير مقالات توعوية في مجالات قانونية متنوعة.</li>
            <li className="mb-4"><strong>ليست استشارة قانونية:</strong> المحتوى المنشور ليس، ولا يجب اعتباره، استشارة قانونية رسمية. تختلف القوانين باختلاف الظروف الخاصة بكل قضية وتخضع للتعديلات المستمرة، لذا لا يجوز الاعتماد على أي مقال أو نص في الموقع كبديل للحصول على استشارة قانونية متخصصة.</li>
            <li className="mb-4"><strong>النتائج غير مضمونة:</strong> لا توجد أي وعود أو ضمانات بتحقيق نتائج معينة في أي قضية أو نزاع قانوني. كل قضية فريدة من نوعها وتعتمد نتيجتها على الوقائع والأدلة والتشريعات المطبقة، ولا يضمن المكتب الفوز بأي قضية، وذلك التزاماً بأصول وآداب مهنة المحاماة.</li>
            <li className="mb-4"><strong>السرية في المراسلات المبدئية:</strong> نرجو عدم إرسال أي معلومات سرية أو حساسة جداً عبر النماذج المفتوحة بالموقع قبل تأكيد التواصل معكم وقبولنا لتمثيلكم رسمياً لضمان تمتع تلك المعلومات بحصانة علاقة الموكل والمحامي.</li>
          </ul>

        </div>
      </div>
    </>
  );
}
