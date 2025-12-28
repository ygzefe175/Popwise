export type VisitorTag = 'indecisive' | 'trust_seeking' | 'benefit_oriented' | 'newsletter' | 'standard';

export type PopupConfig = {
  tag: VisitorTag;
  headline: string;
  subtext: string;
  cta: string;
  position?: 'center' | 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left' | 'top_center' | 'bottom_center';
};

export type DashboardStat = {
  label: string;
  value: string;
  change?: string; // e.g. "+12%"
  trend?: 'up' | 'down' | 'neutral';
};
