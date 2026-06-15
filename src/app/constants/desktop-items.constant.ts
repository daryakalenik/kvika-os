export interface DesktopItem {
  id: string;
  title: string;
  icon: string;
}

export const DESKTOP_ITEMS: DesktopItem[] = [
  {
    id: 'about',
    title: 'About Me',
    icon: 'user',
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: 'folder',
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: 'briefcase',
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: 'mail',
  },
] as const;
