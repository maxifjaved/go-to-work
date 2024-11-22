import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockData } from "@/components/data-table/data"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"

export function ProjectDepartmentSummary() {
    const router = useRouter()
    const departments = [...new Set(mockData.projects.map(p => p.department))]

    const getDepartmentStats = (dept: string) => {
        const deptProjects = mockData.projects.filter(p => p.department === dept)
        return {
            total: deptProjects.length,
            active: deptProjects.filter(p => p.status === 'Active').length,
            completed: deptProjects.filter(p => p.status === 'Completed').length,
            progress: Math.round((deptProjects.filter(p => p.status === 'Completed').length / deptProjects.length) * 100)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Projects by Department</CardTitle>
                <CardDescription>Overview of projects across departments</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {departments.map(dept => {
                        const stats = getDepartmentStats(dept)
                        return (
                            <div key={dept} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="font-medium text-sm">{dept}</p>
                                        <div className="flex items-center space-x-2">
                                            <Badge variant="outline">
                                                {stats.total} Projects
                                            </Badge>
                                            <Badge variant="secondary">
                                                {stats.active} Active
                                            </Badge>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="gap-2"
                                        onClick={() => router.push(`/projects?department=${dept}`)}
                                    >
                                        View Projects
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            {stats.completed} of {stats.total} completed
                                        </span>
                                        <span className="font-medium">{stats.progress}%</span>
                                    </div>
                                    <Progress value={stats.progress} className="h-2" />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}