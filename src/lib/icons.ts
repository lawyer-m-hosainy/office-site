// Named imports only: importing the whole lucide-react namespace pulls the
// entire icon library into the bundle (~840 kB) instead of the few we use.
import {
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronLeft,
  Clock,
  Eye,
  FileText,
  HelpCircle,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scale,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Target,
  User,
  Users,
  X,
} from 'lucide-react';

export {
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronLeft,
  Clock,
  Eye,
  FileText,
  HelpCircle,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scale,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Target,
  User,
  Users,
  X,
};

/** Icons selectable from services.json via the `icon` field. */
export const serviceIcons = {
  Scale,
  FileText,
  Users,
  Briefcase,
  BookOpen,
  ShieldCheck,
} as const;

export function getServiceIcon(name: string) {
  return serviceIcons[name as keyof typeof serviceIcons] ?? HelpCircle;
}
