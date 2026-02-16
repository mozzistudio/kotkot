'use client';

import type { SVGProps, ReactElement, FC } from 'react';
import * as Lucide from 'lucide-react';
import { BrandIcon } from '@/components/shared/BrandIcon';

export type LucideIcon = FC<SVGProps<SVGSVGElement> & { size?: number; className?: string }>;

const iconNameMap = {
  AlertCircle: 'alert-circle',
  AlertTriangle: 'alert-triangle',
  ArrowDown: 'arrow-down',
  ArrowDownRight: 'arrow-down-right',
  ArrowLeft: 'arrow-left',
  ArrowRight: 'arrow-right',
  ArrowUpRight: 'arrow-up-right',
  Award: 'award',
  BarChart3: 'bar-chart3',
  Bell: 'bell',
  Book: 'book',
  BookOpen: 'book-open',
  Bot: 'bot',
  Briefcase: 'briefcase',
  Building2: 'building2',
  Calculator: 'calculator',
  Calendar: 'calendar',
  CalendarDays: 'calendar-days',
  Camera: 'camera',
  Car: 'car',
  Check: 'check',
  CheckCircle: 'check-circle',
  CheckCircle2: 'check-circle2',
  ChevronDown: 'chevron-down',
  ChevronLeft: 'chevron-left',
  ChevronRight: 'chevron-right',
  ChevronUp: 'chevron-up',
  CircleUser: 'circle-user',
  ClipboardList: 'clipboard-list',
  Clock: 'clock',
  Code: 'code',
  CreditCard: 'credit-card',
  Crown: 'crown',
  Database: 'database',
  DollarSign: 'dollar-sign',
  Download: 'download',
  Edit: 'edit',
  ExternalLink: 'external-link',
  Eye: 'eye',
  EyeOff: 'eye-off',
  FileText: 'file-text',
  Filter: 'filter',
  Fingerprint: 'fingerprint',
  GitCompare: 'git-compare',
  Globe: 'globe',
  GraduationCap: 'graduation-cap',
  HandMetal: 'hand-metal',
  Hash: 'hash',
  HeadphonesIcon: 'headphones-icon',
  Heart: 'heart',
  HelpCircle: 'help-circle',
  Home: 'home',
  Inbox: 'inbox',
  Info: 'info',
  Key: 'key',
  Landmark: 'landmark',
  LayoutDashboard: 'layout-dashboard',
  Lightbulb: 'lightbulb',
  Link: 'link',
  Link2: 'link2',
  Loader2: 'loader2',
  Lock: 'lock',
  LogOut: 'log-out',
  Mail: 'mail',
  MapPin: 'map-pin',
  Menu: 'menu',
  MessageCircle: 'message-circle',
  MessageSquare: 'message-square',
  Mic: 'mic',
  Minus: 'minus',
  Moon: 'moon',
  MoreHorizontal: 'more-horizontal',
  MoreVertical: 'more-vertical',
  Package: 'package',
  Palette: 'palette',
  Paperclip: 'paperclip',
  Phone: 'phone',
  Plane: 'plane',
  Plug: 'plug',
  Plus: 'plus',
  Quote: 'quote',
  Receipt: 'receipt',
  RefreshCw: 'refresh-cw',
  Rocket: 'rocket',
  Save: 'save',
  Search: 'search',
  Send: 'send',
  Settings: 'settings',
  Shield: 'shield',
  ShieldCheck: 'shield-check',
  Smartphone: 'smartphone',
  Smile: 'smile',
  Sparkles: 'sparkles',
  Star: 'star',
  StickyNote: 'sticky-note',
  Tag: 'tag',
  Target: 'target',
  Terminal: 'terminal',
  Trash2: 'trash2',
  TrendingDown: 'trending-down',
  TrendingUp: 'trending-up',
  Unplug: 'unplug',
  Upload: 'upload',
  User: 'user',
  UserCheck: 'user-check',
  Users: 'users',
  Video: 'video',
  Wallet: 'wallet',
  Webhook: 'webhook',
  Wifi: 'wifi',
  WifiOff: 'wifi-off',
  X: 'x',
  XCircle: 'xcircle',
  Zap: 'zap',
} as const;

type IconProps = SVGProps<SVGSVGElement> & { size?: number; className?: string };

const createIcon = (icon: keyof typeof iconNameMap) => {
  const Fallback = Lucide[icon as keyof typeof Lucide] as Lucide.LucideIcon | undefined;
  const IconComponent: LucideIcon = ({ size = 24, className, ...props }: IconProps) => (
    <BrandIcon
      name={iconNameMap[icon]}
      size={size}
      className={className}
      fallback={Fallback}
      onClick={props.onClick as (() => void) | undefined}
    />
  );

  IconComponent.displayName = `${icon}BrandIcon`;
  return IconComponent;
};

export const AlertCircle: LucideIcon = createIcon('AlertCircle');
export const AlertTriangle: LucideIcon = createIcon('AlertTriangle');
export const ArrowDown: LucideIcon = createIcon('ArrowDown');
export const ArrowDownRight: LucideIcon = createIcon('ArrowDownRight');
export const ArrowLeft: LucideIcon = createIcon('ArrowLeft');
export const ArrowRight: LucideIcon = createIcon('ArrowRight');
export const ArrowUpRight: LucideIcon = createIcon('ArrowUpRight');
export const Award: LucideIcon = createIcon('Award');
export const BarChart3: LucideIcon = createIcon('BarChart3');
export const Bell: LucideIcon = createIcon('Bell');
export const Book: LucideIcon = createIcon('Book');
export const BookOpen: LucideIcon = createIcon('BookOpen');
export const Bot: LucideIcon = createIcon('Bot');
export const Briefcase: LucideIcon = createIcon('Briefcase');
export const Building2: LucideIcon = createIcon('Building2');
export const Calculator: LucideIcon = createIcon('Calculator');
export const Calendar: LucideIcon = createIcon('Calendar');
export const CalendarDays: LucideIcon = createIcon('CalendarDays');
export const Camera: LucideIcon = createIcon('Camera');
export const Car: LucideIcon = createIcon('Car');
export const Check: LucideIcon = createIcon('Check');
export const CheckCircle: LucideIcon = createIcon('CheckCircle');
export const CheckCircle2: LucideIcon = createIcon('CheckCircle2');
export const ChevronDown: LucideIcon = createIcon('ChevronDown');
export const ChevronLeft: LucideIcon = createIcon('ChevronLeft');
export const ChevronRight: LucideIcon = createIcon('ChevronRight');
export const ChevronUp: LucideIcon = createIcon('ChevronUp');
export const CircleUser: LucideIcon = createIcon('CircleUser');
export const ClipboardList: LucideIcon = createIcon('ClipboardList');
export const Clock: LucideIcon = createIcon('Clock');
export const Code: LucideIcon = createIcon('Code');
export const CreditCard: LucideIcon = createIcon('CreditCard');
export const Crown: LucideIcon = createIcon('Crown');
export const Database: LucideIcon = createIcon('Database');
export const DollarSign: LucideIcon = createIcon('DollarSign');
export const Download: LucideIcon = createIcon('Download');
export const Edit: LucideIcon = createIcon('Edit');
export const ExternalLink: LucideIcon = createIcon('ExternalLink');
export const Eye: LucideIcon = createIcon('Eye');
export const EyeOff: LucideIcon = createIcon('EyeOff');
export const FileText: LucideIcon = createIcon('FileText');
export const Filter: LucideIcon = createIcon('Filter');
export const Fingerprint: LucideIcon = createIcon('Fingerprint');
export const GitCompare: LucideIcon = createIcon('GitCompare');
export const Globe: LucideIcon = createIcon('Globe');
export const GraduationCap: LucideIcon = createIcon('GraduationCap');
export const HandMetal: LucideIcon = createIcon('HandMetal');
export const Hash: LucideIcon = createIcon('Hash');
export const HeadphonesIcon: LucideIcon = createIcon('HeadphonesIcon');
export const Heart: LucideIcon = createIcon('Heart');
export const HelpCircle: LucideIcon = createIcon('HelpCircle');
export const Home: LucideIcon = createIcon('Home');
export const Inbox: LucideIcon = createIcon('Inbox');
export const Info: LucideIcon = createIcon('Info');
export const Key: LucideIcon = createIcon('Key');
export const Landmark: LucideIcon = createIcon('Landmark');
export const LayoutDashboard: LucideIcon = createIcon('LayoutDashboard');
export const Lightbulb: LucideIcon = createIcon('Lightbulb');
export const Link: LucideIcon = createIcon('Link');
export const Link2: LucideIcon = createIcon('Link2');
export const Loader2: LucideIcon = createIcon('Loader2');
export const Lock: LucideIcon = createIcon('Lock');
export const LogOut: LucideIcon = createIcon('LogOut');
export const Mail: LucideIcon = createIcon('Mail');
export const MapPin: LucideIcon = createIcon('MapPin');
export const Menu: LucideIcon = createIcon('Menu');
export const MessageCircle: LucideIcon = createIcon('MessageCircle');
export const MessageSquare: LucideIcon = createIcon('MessageSquare');
export const Mic: LucideIcon = createIcon('Mic');
export const Minus: LucideIcon = createIcon('Minus');
export const Moon: LucideIcon = createIcon('Moon');
export const MoreHorizontal: LucideIcon = createIcon('MoreHorizontal');
export const MoreVertical: LucideIcon = createIcon('MoreVertical');
export const Package: LucideIcon = createIcon('Package');
export const Palette: LucideIcon = createIcon('Palette');
export const Paperclip: LucideIcon = createIcon('Paperclip');
export const Phone: LucideIcon = createIcon('Phone');
export const Plane: LucideIcon = createIcon('Plane');
export const Plug: LucideIcon = createIcon('Plug');
export const Plus: LucideIcon = createIcon('Plus');
export const Quote: LucideIcon = createIcon('Quote');
export const Receipt: LucideIcon = createIcon('Receipt');
export const RefreshCw: LucideIcon = createIcon('RefreshCw');
export const Rocket: LucideIcon = createIcon('Rocket');
export const Save: LucideIcon = createIcon('Save');
export const Search: LucideIcon = createIcon('Search');
export const Send: LucideIcon = createIcon('Send');
export const Settings: LucideIcon = createIcon('Settings');
export const Shield: LucideIcon = createIcon('Shield');
export const ShieldCheck: LucideIcon = createIcon('ShieldCheck');
export const Smartphone: LucideIcon = createIcon('Smartphone');
export const Smile: LucideIcon = createIcon('Smile');
export const Sparkles: LucideIcon = createIcon('Sparkles');
export const Star: LucideIcon = createIcon('Star');
export const StickyNote: LucideIcon = createIcon('StickyNote');
export const Tag: LucideIcon = createIcon('Tag');
export const Target: LucideIcon = createIcon('Target');
export const Terminal: LucideIcon = createIcon('Terminal');
export const Trash2: LucideIcon = createIcon('Trash2');
export const TrendingDown: LucideIcon = createIcon('TrendingDown');
export const TrendingUp: LucideIcon = createIcon('TrendingUp');
export const Unplug: LucideIcon = createIcon('Unplug');
export const Upload: LucideIcon = createIcon('Upload');
export const User: LucideIcon = createIcon('User');
export const UserCheck: LucideIcon = createIcon('UserCheck');
export const Users: LucideIcon = createIcon('Users');
export const Video: LucideIcon = createIcon('Video');
export const Wallet: LucideIcon = createIcon('Wallet');
export const Webhook: LucideIcon = createIcon('Webhook');
export const Wifi: LucideIcon = createIcon('Wifi');
export const WifiOff: LucideIcon = createIcon('WifiOff');
export const X: LucideIcon = createIcon('X');
export const XCircle: LucideIcon = createIcon('XCircle');
export const Zap: LucideIcon = createIcon('Zap');
