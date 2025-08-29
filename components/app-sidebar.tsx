"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const navMain = [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Analytics", url: "/analytics", icon: IconChartBar },
    { title: "Orders", url: "/orders", icon: IconListDetails },
    { title: "Products", url: "/products", icon: IconFolder },
    { title: "Users", url: "/users", icon: IconUsers },
  ] as const

  // TecDoc catalogue sectie — matcht je app/api map:
  const navCatalogue = [
    { title: "Zoek op artikel", url: "/dashboard/catalog/search" },     // -> GET /api/search
    { title: "Zoek op kenteken", url: "/dashboard/catalog/plate" },     // -> GET /api/plates
    { title: "Merk / Model / Bouwjaar", url: "/dashboard/catalog/vehicles" }, // -> GET /api/vehicles
    { title: "Categorieën", url: "/dashboard/catalog/categories" },     // -> GET /api/categories
    { title: "Merken", url: "/dashboard/catalog/brands" },              // -> (optioneel) /api/categories?brands=1 of eigen /api/brands
    { title: "Motors", url: "/dashboard/catalog/motor" },   
    { title: "Gedelegeerde artikelen", url: "/dashboard/catalog/articles/assigned" },
    { title: "Artikelstatus", url: "/dashboard/catalog/articles/state" },
    { title: "Merken", url: "/dashboard/catalog/brands" }
  ] as const

  const navSecondary = [
    { title: "Settings", url: "/settings", icon: IconSettings },
    { title: "Help", url: "/help", icon: IconHelp },
    { title: "Search", url: "/search", icon: IconSearch },
  ] as const

  const documents = [
    { name: "Data Library", url: "/data-library", icon: IconDatabase },
    { name: "Reports", url: "/reports", icon: IconReport },
    { name: "Word Assistant", url: "/word-assistant", icon: IconFileWord },
  ] as const

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/dashboard" aria-label="Go to dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* MAIN */}
        <NavMain
          items={navMain.map((i) => ({
            title: i.title,
            url: i.url,
            icon: i.icon,
            isActive: pathname.startsWith(i.url),
          }))}
        />

        {/* CATALOGUE (TecDoc) */}
        <NavDocuments
          items={navCatalogue.map((i) => ({
            name: i.title,
            url: i.url,
            icon: IconDatabase,
            isActive: pathname.startsWith(i.url),
          }))}
        />

        {/* Optional: overige documenten */}
        <NavDocuments
          items={documents.map((d) => ({
            name: d.name,
            url: d.url,
            icon: d.icon,
            isActive: pathname.startsWith(d.url),
          }))}
        />

        <NavSecondary
          items={navSecondary.map((i) => ({
            title: i.title,
            url: i.url,
            icon: i.icon,
            isActive: pathname.startsWith(i.url),
          }))}
          className="mt-auto"
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
