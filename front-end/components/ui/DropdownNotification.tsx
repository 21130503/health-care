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
import { useState } from "react";
import { Button } from "./button";
interface NotiProps{
  notification: Array<any>
}
  export default function DropdownNotification({notification}:NotiProps) {
    const [open, setOpen] = useState(false)
    const route = useRouter()
    const handleLogout = () => {
      Cookies.remove('user')
      route.push('/login')
    }
    return (
      <div>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
            <Button
                variant="ghost"
                className={`capitalize`}
            >
                <span className='relative' >
            <Image
              src={'/assets/icons/notification.svg'}
              height={32}
              width={32}
              alt='Notifications'
            />
            <span className='absolute flex items-center 
            justify-center -top-3.5 -right-3.5 h-4 w-4 border
             border-slate-600 p-3 rounded-3xl'>{0}</span>
          </span>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {
                notification?.map((item, index) => (
                  <DropdownMenuItem key={index} className="cursor-pointer">
                    <Link href={`/temporary/${item.id}`} className="flex">
                      <Image
                      src={'/assets/icons/doctor.svg'}
                      height={32}
                      width={32}
                      alt="icon"
                      
                      />
                      <span>Yêu cầu chỉnh sửa thông tin từ bác sĩ {item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    )
  }
  