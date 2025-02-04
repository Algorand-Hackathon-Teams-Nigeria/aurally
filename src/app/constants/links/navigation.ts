/*export const NAVS = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About Us",
    link: "/about",
  },
  {
    label: "Products",
    link: "/products",
  },
  {
    label: "Academy",
    link: "/academy",
  },
  {
    label: "News & Events",
    link: "/news-and-events",
  },
  // {
  //   label: "Founders",
  //   link: "#founders",
  // },
] as const;*/

interface NavItem {
  label: string;
  link: string;
  submenu?: { label: string; link: string }[];  // Optional submenu
}

export const NAVS: NavItem[] = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About Us",
    link: "/about",
    submenu: [
      { label: "about", link: "/about/about" },
      { label: "about", link: "/about/about" },
    ],
  },
  {
    label: "Products",
    link: "/products",
    submenu: [
      { label: "Songs", link: "/products/songs" },
      { label: "Accessories", link: "/products/accessories" },
    ],
  },
  {
    label: "Academy",
    link: "/academy",
    submenu: [
      { label: "Courses", link: "/academy/courses" },
      { label: "Workshops", link: "/academy/workshops" },
    ],
  },
  {
    label: "News & Events",
    link: "/news-and-events",
  },
];

