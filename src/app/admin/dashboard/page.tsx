import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Users, BookOpen, CheckCircle, BrainCircuit, Activity } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  // Fetch Database Metrics
  const totalUsers = await prisma.user.count();
  const totalNotes = await prisma.note.count();
  const totalQuizzes = await prisma.quizScore.count();
  const totalCompletedTopics = await prisma.topicProgress.count({ where: { isCompleted: true } });
  
  const recentUsers = await prisma.user.findMany({
    orderBy: { id: 'desc' },
    take: 5,
    select: { name: true, email: true, role: true }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <div className="flex items-center space-x-3 border-b border-border pb-4">
              <Activity className="text-blue-500 w-8 h-8" />
              <div>
                <h1 className="text-2xl font-extrabold text-foreground">Global Activity Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Live metrics from your Vercel Postgres Database.</p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard title="Registered Users" value={totalUsers} icon={<Users size={16} />} color="text-blue-500" bg="bg-blue-500/10" />
              <MetricCard title="Topics Completed" value={totalCompletedTopics} icon={<CheckCircle size={16} />} color="text-emerald-500" bg="bg-emerald-500/10" />
              <MetricCard title="Quizzes Taken" value={totalQuizzes} icon={<BrainCircuit size={16} />} color="text-purple-500" bg="bg-purple-500/10" />
              <MetricCard title="Notes Saved" value={totalNotes} icon={<BookOpen size={16} />} color="text-amber-500" bg="bg-amber-500/10" />
            </div>

            {/* Recent Users Table */}
            <div className="bg-card border border-border rounded-xl shadow-sm p-6">
              <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Recently Registered Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/50 text-xs text-muted-foreground">
                      <th className="pb-2 font-semibold">Name</th>
                      <th className="pb-2 font-semibold">Email</th>
                      <th className="pb-2 font-semibold">Role</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {recentUsers.map((u, i) => (
                      <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="py-3 text-foreground font-medium">{u.name || "Anonymous"}</td>
                        <td className="py-3 text-muted-foreground">{u.email}</td>
                        <td className="py-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            u.role === "ADMIN" ? "bg-rose-500/10 text-rose-500" : "bg-blue-500/10 text-blue-500"
                          }`}>
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {recentUsers.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-xs text-muted-foreground">No users registered yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, color, bg }: { title: string, value: number, icon: React.ReactNode, color: string, bg: string }) {
  return (
    <div className="bg-card border border-border p-5 rounded-xl flex flex-col items-center justify-center text-center space-y-2 shadow-sm">
      <div className={`p-3 rounded-full ${bg} ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase text-muted-foreground">{title}</p>
        <p className="text-3xl font-extrabold text-foreground">{value}</p>
      </div>
    </div>
  );
}
