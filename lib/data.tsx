import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { MdMessage } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoPersonCircleSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
export const links = [
  {
    id: "home",
    name: "Home",
    hash: "#home",
  },
  {
    id: "features",
    name: "Features",
    hash: "#features",
  },
  {
    id: "coaches",
    name: "Coaches",
    hash: "#coaches",
  },
  {
    id: "faq",
    name: "FAQ",
    hash: "#faq",
  },
  {
    id: "contact",
    name: "Contact",
    hash: "#contact",
  },
];

export const features = [
  {
    title: "Home",
    description:
      "In the 'Home' section, you'll find a cigarette counter and a timer to track your smoke-free time. At the bottom, there's a timeline that logs your smoked cigarettes, including location and timestamp. This timeline allows you to filter by different parameters such as the current day, yesterday, or the entire week, offering insights into your smoking patterns and progress on your smoke-free journey.",
    imagePath: "/icon-home.png",
    alt: "icon home",
  },
  {
    title: "Health",
    description:
      "In the 'Health' section, you can monitor the percentage improvements in various aspects of your health as you continue to stay smoke-free. These aspects include blood pressure, blood oxygen levels, nicotine levels in the blood, the risk of heart attack, and more.",
    imagePath: "/icon-health.png",
    alt: "icon health",
  },
  {
    title: "Money",
    description:
      "Here, you can visualize your weekly cigarette expenses through Line and Pie graphs. Additionally, you'll have the ability to track your total spending for the month and overall duration.",
    imagePath: "/icon-money.png",
    alt: "icon money",
  },
  {
    title: "Communities",
    description:
      "Discover a dynamic 'Communities' section designed for both quitters and coaches. Connect with others who understand your journey, engage in private chats, and share your progress through posts. Find profiles of coaches and access their services directly in the app. For coaches, this section offers tailored tools to interact, share insights, and connect with potential clients.",
    imagePath: "/icon-communities.png",
    alt: "icon communities",
  },
] as const;

export const coaches = [
  {
    id: 1,
    description: `Share your expertise and provide personalized guidance to
    empower others to break free from the habit and improve their
    well-being. Make a positive impact and earn money by helping
    people lead healthier lives.`,
    imagePath: "/icon-money-coach.png",
    alt: "icon money coach",
  },
  {
    id: 2,
    description: `As a Quit Smoking Coach, you will offer customized modules and
    exercises to individuals who are quitting smoking. These
    resources will be specifically designed to address their unique
    needs, challenges, and motivations.`,
    imagePath: "/icon-homework-coach.png",
    alt: "icon homework coach",
  },
  {
    id: 3,
    description: `Facilitate direct and convenient communication between the Quit
    Smoking Coach and individuals through video calls and chat. This
    feature allows for real-time discussions, providing a personal
    touch to the coaching experience.`,
    imagePath: "/icon-videocall-coach.png",
    alt: "icon videocall coach",
  },
] as const;

export const faq = [
  {
    id: 1,
    question: "How does the tracking feature work?",
    answer:
      "Effortlessly log the time elapsed since your previous cigarette. Instantly calculate and showcase your financial dedication to your newfound freedom. Witness remarkable improvements in your health with each smoke-free milestone.",
  },
  {
    id: 2,
    question: "What can I do in the Communities section?",
    answer:
      "The Communities section is similar to a social network where you can post your progress, your mood, or anything you'd like to share with fellow quitters like yourself, all in an effort to support each other in quitting smoking. You can follow others and have private chats through messaging. Here, you'll also find coaches who offer their services.",
  },
  {
    id: 3,
    question: "Is the app free to use?",
    answer:
      "Currently, the app is free to use. You can enjoy features such as tracking your cigarette consumption, maintaining a history of smoked cigarettes with dates and locations, viewing health and expense statistics, and engaging with the community by sharing posts and connecting with other quitters.",
  },
];

export const socialMedia = [
  {
    id: 1,
    link: "https://www.facebook.com/app.lucky.quit",
    icon: "/facebook-logo.png",
    alt: "facebook logo",
  },
  {
    id: 2,
    link: "https://twitter.com/lucky_quit_app",
    icon: "/twitter-logo.png",
    alt: "twitter logo",
  },
  {
    id: 3,
    link: "https://www.instagram.com/lucky_quit/",
    icon: "/instagram-logo.png",
    alt: "instagram logo",
  },
  {
    id: 4,
    link: "https://www.threads.net/@lucky_quit",
    icon: "/threads-logo.png",
    alt: "threads logo",
  },
];

export const menuItems = [
  {
    title: "Home",
    icon: <AiFillHome />,
  },
  {
    title: "Network",
    icon: <BsPeopleFill />,
  },
  {
    title: "Messages",
    icon: <MdMessage  />,
  },
  {
    title: "Notifications",
    icon: <IoIosNotifications  />,
  },
  {
    title: "You",
    icon: <IoPersonCircleSharp  />,
  },
  {
    title: "Logout",
    icon: <LuLogOut  />,
  },
];
