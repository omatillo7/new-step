export interface IMenu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  BgColor?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: NonNullable<
    "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain"
  >;
  chipIcon?: string;
  children?: IMenu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
  visible: string[] | boolean | string;
}

const sidebarItem: IMenu[] = [
  {
    title: "Dashboard",
    icon: "mdi-chart-bar",
    BgColor: "primary",
    to: "/dashboard",
    visible: true,
  },
  {
    title: "Malumotlar",
    icon: "mdi-video-outline",
    BgColor: "primary",
    to: "/Bank",
    visible: true,
  },
];

export default sidebarItem;
