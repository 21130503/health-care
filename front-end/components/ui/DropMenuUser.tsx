import {
    Cloud,
    Github,
    LifeBuoy,
    LogOut,
  } from "lucide-react"
  
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

interface DropdownMenuProps{
    open: boolean,
    setOpen: any,
    className? : string,
  
}
  export default function DropdownMenuUser({className, open, setOpen }: DropdownMenuProps) {
    const route = useRouter()
    const handleLogout = () => {
      Cookies.remove('user')
      route.push('/login')
    }
    return (
      <div className={className}>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <span></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="cursor-pointer">
                <Cloud className="mr-2 h-4 w-4" />
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>handleLogout()} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    )
  }
  