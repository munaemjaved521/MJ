import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useContext } from "react";
import { ThemeContext } from "../context/Themecontext.jsx";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">Documents</h1>
        
        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:inline-block capitalize">
            {theme} mode
          </span>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full w-9 h-9 border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 transition-colors"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4 transition-transform" />
            ) : (
              <Sun className="h-4 w-4 transition-transform" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}