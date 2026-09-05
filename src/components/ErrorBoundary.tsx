import { Component, type ErrorInfo, type ReactNode } from 'react';
import siteData from '../content/site.json';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">حدث خطأ غير متوقع</h1>
          <p className="text-text-muted leading-relaxed mb-8">
            نعتذر عن هذا العطل المؤقت. يمكنك إعادة تحميل الصفحة، أو التواصل معنا مباشرة عبر
            واتساب وسنكون سعداء بمساعدتك.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/"
              className="bg-primary text-white px-8 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors"
            >
              العودة إلى الرئيسية
            </a>
            <a
              href={siteData.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp text-white px-8 py-3 rounded-md font-bold hover:bg-whatsapp/90 transition-colors"
            >
              تواصل عبر واتساب
            </a>
          </div>
        </div>
      </div>
    );
  }
}
