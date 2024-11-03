"use client"

import * as React from "react"
import { CalendarDaysIcon, Presentation } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={[
          {
            title: "Interviews",
            url: "/interviews",
            icon: Presentation,
            isActive: path.startsWith("/interviews"),
          },
          {
            title: "Availability",
            url: "/availability",
            icon: CalendarDaysIcon,
            isActive: path.startsWith("/availability"),
          },
        ]} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
