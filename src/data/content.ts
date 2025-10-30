export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type FeatureHighlight = {
  title: string;
  description: string;
  href: string;
  accentColor: string;
};

export type EventSummary = {
  id: string;
  title: string;
  date: string;
  location: string;
  summary: string;
};

export type MentorshipTrack = {
  title: string;
  description: string;
  mentor: string;
  mentorTitle: string;
};

export type DonationInitiative = {
  title: string;
  impact: string;
  amountRaised: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export type AlumniStory = {
  name: string;
  headline: string;
  year: string;
  description: string;
};

export type DirectoryEntry = {
  name: string;
  title: string;
  company: string;
  location: string;
  focus: string;
  availability: string;
};

export const navLinks: NavLink[] = [
  { label: "Signal Commons", href: "/group-chat", description: "Collaborate with your team" },
  { label: "Events", href: "/events", description: "Discover upcoming meetups" },
  { label: "Mentorship", href: "/mentorship", description: "Connect with mentors and peers" },
  { label: "Donations", href: "/donations", description: "Support scholarships and funds" },
  { label: "Directory", href: "/directory", description: "Browse the public alumni directory" },
];

export const featureHighlights: FeatureHighlight[] = [
  {
    title: "Signal Commons Channels",
    description: "Coordinate alumni teams with persistent messaging, digests, and pinned resources.",
    href: "/group-chat",
    accentColor: "from-violet-500 to-blue-500",
  },
  {
    title: "Mentorship Journeys",
    description: "Students request guidance while alumni volunteer expertise and time.",
    href: "/mentorship",
    accentColor: "from-emerald-500 to-cyan-500",
  },
  {
    title: "Impactful Giving",
    description: "Track donations, match employer contributions, and visualize initiatives.",
    href: "/donations",
    accentColor: "from-violet-500 to-fuchsia-500",
  },
];

export const communityStats = [
  { label: "Active alumni", value: "4.2k", helper: "Updated in the last 90 days" },
  { label: "Mentorship matches", value: "318", helper: "Across career and graduate guidance" },
  { label: "Funds raised", value: "$1.4M", helper: "For scholarships and campus initiatives" },
];

export const upcomingEvents: EventSummary[] = [
  {
    id: "founders-forum",
    title: "Founders Forum + Demo Night",
    date: "Oct 12, 2025 • 6:00 PM",
    location: "Innovation Hub, SF Campus",
    summary: "Pitch sessions and panel with alumni-backed startups plus networking.",
  },
  {
    id: "global-day",
    title: "Global Alumni Day of Service",
    date: "Nov 3, 2025 • 9:00 AM",
    location: "30+ cities worldwide",
    summary: "Community service projects coordinated by alumni chapters around the world.",
  },
  {
    id: "winter-social",
    title: "Winter Social & Giving Reception",
    date: "Dec 7, 2025 • 7:30 PM",
    location: "Kensington Hall, NYC",
    summary: "Celebrate year-end impact, meet scholarship recipients, and support new funds.",
  },
];

export const mentorshipTracks: MentorshipTrack[] = [
  {
    title: "Product Management Fast Track",
    description: "Six-week cohort with weekly office hours covering discovery, delivery, and stakeholder storytelling.",
    mentor: "Priya Narayanan",
    mentorTitle: "Director of Product, Lumen Labs",
  },
  {
    title: "Graduate School Compass",
    description: "Pair with alumni mentors to review applications, essays, and interview prep across top programs.",
    mentor: "Evan Chen",
    mentorTitle: "MBA '18, Strategy Lead at Northwind",
  },
  {
    title: "Startup Go-To-Market Clinics",
    description: "Hands-on sessions to refine positioning, pricing, and customer success playbooks.",
    mentor: "Sasha Martinez",
    mentorTitle: "Founder, Orion Growth Collective",
  },
];

export const donationInitiatives: DonationInitiative[] = [
  {
    title: "First-Gen Scholars Fund",
    impact: "Provides stipend support and mentorship for 40 first-generation students annually.",
    amountRaised: "$420k",
  },
  {
    title: "Innovation Seed Grants",
    impact: "Five grants each semester fuel student-led research and social ventures.",
    amountRaised: "$310k",
  },
  {
    title: "Campus Sustainability Lab",
    impact: "Upgrades lab equipment and funds collaborative industry partnerships on clean tech.",
    amountRaised: "$215k",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Jordan Blake",
    role: "BS '15 • Product Lead, Aurora",
    quote: "Mentoring through the platform keeps me connected and gives students tangible momentum.",
  },
  {
    name: "Maya Iyer",
    role: "MBA '23 • Social Impact Fellow",
    quote: "The donations dashboard shows exactly how alumni contributions translate to student programs.",
  },
  {
    name: "Rohan Patel",
    role: "Class of 2026 • Robotics Scholar",
    quote: "I found two mentors and landed a summer internship through the directory within weeks.",
  },
];

export const callToActions = {
  headline: "Centralized alumni engagement",
  description: "Signal Commons, mentorship, events, and giving tools in one secure workspace for your community.",
  primary: { label: "Sign in with Google", href: "/login" },
  secondary: { label: "Explore events", href: "/events" },
};

export const alumniStories: AlumniStory[] = [
  {
    name: "Anita Lawson",
    headline: "Designing inclusive fintech products",
    year: "Class of 2012",
    description:
      "Anita leads inclusive design at Meridian Bank, mentoring under-represented founders and funding scholarships for design students.",
  },
  {
    name: "Haruto Sato",
    headline: "Scaling sustainable supply chains",
    year: "MBA '19",
    description:
      "Haruto's team at TerraLoop partnered with student researchers to cut logistics emissions by 28% across three continents.",
  },
  {
    name: "Lina Gómez",
    headline: "Empowering first-gen scholars",
    year: "Class of 2016",
    description:
      "Through Alumni Hub, Lina coordinates mentorship cohorts and micro-grants that support 60+ first-generation students annually.",
  },
];

export const directoryHighlights: DirectoryEntry[] = [
  {
    name: "Priya Narayanan",
    title: "Director of Product",
    company: "Lumen Labs",
    location: "San Francisco, CA",
    focus: "Product, AI, Growth",
    availability: "Mentorship & Advisory",
  },
  {
    name: "Evan Chen",
    title: "Strategy Lead",
    company: "Northwind",
    location: "Singapore",
    focus: "Strategy, Consulting, Graduate Prep",
    availability: "Coffee chats",
  },
  {
    name: "Sasha Martinez",
    title: "Founder",
    company: "Orion Growth Collective",
    location: "Austin, TX",
    focus: "Startups, GTM, Partnerships",
    availability: "Office hours",
  },
  {
    name: "Maya Iyer",
    title: "Social Impact Fellow",
    company: "Aurora Foundation",
    location: "New York, NY",
    focus: "Impact investing, Non-profits",
    availability: "Project collaborations",
  },
];
