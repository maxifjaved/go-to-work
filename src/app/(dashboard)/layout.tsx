"use client"
//
// import {Sidebar} from "@/components/layout/sidebar"
// import {Header} from "@/components/layout/header"
import {MainLayout} from "@/components/layout/main-layout";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {

    return (
        <MainLayout>
            {/*<div className="min-h-screen">
                <Header/>
                <div className="flex h-screen overflow-hidden">
                    <Sidebar/>
                    <main className="flex-1 overflow-y-auto bg-background pt-16 pb-1">
                        <div className="container p-6">*/}
            {children}
            {/*</div>
                    </main>
                </div>
            </div>*/}
        </MainLayout>
    )
}