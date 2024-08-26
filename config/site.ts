export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Aamirpal Sehmi",
  description: "Building scalable solutions with passion and precision.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Posts",
      href: "/blog",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/aamirpal",
    twitter: "https://twitter.com/aamirpalsehmi",
    docs: "https://nextui.org",
    discord: "https://discord.gg/",
    linkedin: "https://www.linkedin.com/in/aamirpal/",
  },
};
