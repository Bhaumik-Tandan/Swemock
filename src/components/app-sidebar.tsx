"use client"

import * as React from "react"
import { CalendarCheck2, CalendarDaysIcon, Presentation, UserCog } from "lucide-react"

import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname();

  const nav = {
    interviewee: [
      {
        title: "Schedule",
        url: "/schedule",
        icon: CalendarCheck2,
        isActive: path.startsWith("/schedule"),
      },
    ],
    interviewer: [
      {
        title: "Availability",
        url: "/availability",
        icon: CalendarDaysIcon,
        isActive: path.startsWith("/availability"),
      },
      {
        title: "Skills",
        url: "/skills",
        icon: UserCog,
        isActive: path.startsWith("/skills"),
      },
    ]
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={path.startsWith("/interviews")}>
                <Link href="/interviews" className="data-[active=true]:bg-slate-200 data-[state=open]:hover:bg-slate-200">
                  <Presentation />
                  <span>Interviews</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Interviewee</SidebarGroupLabel>
          <SidebarMenu>
            {nav.interviewee.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <Link href={item.url} className="data-[active=true]:bg-slate-200 data-[state=open]:hover:bg-slate-200">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Interviewer</SidebarGroupLabel>
          <SidebarMenu>
            {nav.interviewer.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <Link href={item.url} className="data-[active=true]:bg-slate-200 data-[state=open]:hover:bg-slate-200">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
