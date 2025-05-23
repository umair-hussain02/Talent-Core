import {
  Calendar,
  LayoutDashboard,
  MessageSquareMore,
  BriefcaseBusiness,
  Users,
  GitPullRequest,
  ScreenShare,
  UserRound,
  FileText,
  ChartColumn,
} from "lucide-react";

const sections = [
  {
    title: null,
    items: [
      { title: "Dashboards", url: "/", icon: LayoutDashboard },
      { title: "Messages", url: "/messages", icon: MessageSquareMore },
      { title: "Calendar", url: "/calendar", icon: Calendar },
    ],
  },
  {
    title: "Recruitment",
    items: [
      { title: "Jobs", url: "/jobs", icon: BriefcaseBusiness },
      { title: "Candidates", url: "/candidates", icon: Users },
      { title: "Referrals", url: "/referrals", icon: GitPullRequest },
      { title: "Career Site", url: "/career-site", icon: ScreenShare },
    ],
  },
  {
    title: "Organization",
    items: [
      { title: "Employees", url: "/employees", icon: UserRound },
      { title: "Documents", url: "/documents", icon: FileText },
      { title: "Reports", url: "/reports", icon: ChartColumn },
    ],
  },
];

export default sections;
