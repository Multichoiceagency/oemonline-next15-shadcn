import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">{children}</main>
        </div>
      </body>
    </html>
  );
}
