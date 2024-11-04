import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, UserRoundCog } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

function AdminSidebar() {
  console.log("AdminSidebar");
  return (
      <Sidebar className="w-64 h-full mt-12 border-none relative">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem className="py-2 flex flex-row gap-2">
                <LayoutDashboard />
                <Link to={"/admin"}>Dashboard</Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="py-2 flex flex-row gap-2">
                <UserRoundCog />
                <Link to={"/admin/usermng"}>User Manage</Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="py-2 flex flex-row gap-2">
                <UserRoundCog />
                <Link to={"/admin/bookingsmng"}>Bookings Manage</Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="py-2 flex flex-row gap-2">
                <UserRoundCog />
                <Link to={"/admin/ordermng"}>Order Manage</Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  );
}

export default AdminSidebar;
