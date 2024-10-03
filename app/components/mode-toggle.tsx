    "use client";
    import * as React from "react";
    import { Moon, Sun } from "lucide-react"; 
    import { useTheme } from "next-themes";
    import { Button } from "@/components/ui/button"; 

    export default function ModeToggle() {
      const { theme, setTheme } = useTheme();

      return (
        <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-300" />
          ) : (
            <Moon className="w-5 h-5 text-white" />
          )}
          <span className="sr-only">Toggle Theme</span>
        </Button>
      );
    }
