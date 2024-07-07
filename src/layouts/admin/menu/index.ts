import { title } from "process";

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
    title: `Bank`,
    to: `/Bank`,
    BgColor: "primary",
    icon: "mdi mdi-file-document-multiple-outline", 
    visible:true
  },
  {
    title: `Ifut`,
    to: `/ifut`,
    BgColor: "primary",
    icon: "mdi mdi-file-document-multiple-outline", 
    visible:true
  },
];

export default sidebarItem;
