"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Đảm bảo theme có giá trị hợp lệ
  const currentTheme = theme === "dark" ? "dark" : "light";

  return (
    <Button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      title="Toggle Theme"
      className="flex items-center justify-center p-2 transition duration-200 hover:bg-gray-700 rounded-md" 
    >
      {currentTheme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-300" />
      ) : (
        <Moon className="w-5 h-5 text-white" />
      )}
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
