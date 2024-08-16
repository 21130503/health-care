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
import Image from "next/image";
import Link from "next/link";

interface DropdownMenuProps{
    open: boolean,
    setOpen: any,
    className? : string,
  
}
  export default function DropdownMenuAdmin({className, open, setOpen }: DropdownMenuProps) {
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
                <Image
                className="mr-2 h-4 w-4"
                src={'/assets/icons/department.svg'}
                height={24}
                width={24}
                alt="department"
                />
                <Link href={'/admin/departments-management'}>Department management</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
              <Image
                className="mr-2 h-4 w-4"
                src={'/assets/icons/doctor.svg'}
                height={24}
                width={24}
                alt="department"
                />
                <Link href={'/admin/doctor-management'}>Department management</Link>
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
  