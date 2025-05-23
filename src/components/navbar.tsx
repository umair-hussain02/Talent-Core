import { Search, Settings, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="border-b bg-gray-100 text-black border-gray-200 ">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-2 mr-8">
          <div className="text-pink-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              <path d="M12 3a6 6 0 0 1-9 9 9 9 0 0 0 9-9Z" />
            </svg>
          </div>
          <span className="text-xl font-semibold">TalentCore</span>
        </div>

        <div className="relative flex-1 max-w-md ml-20">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <Input
            type="search"
            placeholder="Search for jobs, candidates and more..."
            className="pl-10 bg-gray-50 border-gray-300 text-gray-900 focus-visible:ring-gray-300"
          />
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500"></span>
          </Button>

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>TC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
