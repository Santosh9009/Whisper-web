import {
  BarIcon,
  HeartIcon,
  SearchIcon,
  ProfileIcon,
  HomeIcon,
} from "../../public/assests/Images";

export const navLinks = [
  {
    label: "Home",
    img: HomeIcon,
    route: "/",
    isActive: false,
    isDisabled: false,
  },
  {
    label: "Search",
    img: SearchIcon,
    route: "/search",
    isActive: false,
    isDisabled: false,
  },
  {
    label: "Activity",
    img: HeartIcon,
    route: "/activity",
    isActive: false,
    isDisabled: false,
  },
  {
    label: "Profile",
    img: ProfileIcon,
    route: "/profile",
    isActive: false,
    isDisabled: false,
  },
  // {
  //   label: "Login",
  //   img: "../../public/assests/icons8-home.svg",
  //   route: "/login",
  //   isActive: false,
  //   isDisabled: true, // Example if you need to disable the Login link in the future
  // }
];