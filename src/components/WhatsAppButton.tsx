import { MessageCircle } from '../lib/icons';
import { trackLead } from '../lib/analytics';
import siteData from '../content/site.json';

export default function WhatsAppButton() {
  return (
    <a
      href={siteData.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLead('whatsapp', 'floating_button')}
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-6 start-6 z-50 bg-whatsapp text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
    >
      <MessageCircle size={32} aria-hidden="true" />
    </a>
  );
}
