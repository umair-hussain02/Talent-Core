"use client";

import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import sections from "@/data/navigations";

export function AppSidebar() {
  const pathname = usePathname();

  const renderMenuItems = (items: (typeof sections)[0]["items"]) =>
    items.map((item) => {
      const isActive = pathname === item.url;
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            className={`flex items-center gap-2 px-4 py-2 transition-colors ${
              isActive
                ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-r-full"
                : "hover:bg-muted"
            }`}
          >
            <a href={item.url} className="flex items-center gap-2 w-full">
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

  return (
    <Sidebar className="mt-[55px]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map((section) => (
                <div key={section.title || "default"}>
                  {section.title && (
                    <SidebarGroupLabel className="text-sm font-semibold px-4 py-2 text-muted-foreground">
                      {section.title}
                    </SidebarGroupLabel>
                  )}
                  {renderMenuItems(section.items)}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator className="bg-border" />
      </SidebarContent>
    </Sidebar>
  );
}
