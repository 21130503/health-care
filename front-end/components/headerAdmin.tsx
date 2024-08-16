import Image from 'next/image'
import NotificationComp from './ui/Notification'
import OptionAdmin from './ui/optionAdmin'
import Link from 'next/link'
export const HeaderAdmin = () => {
    return (
      <header className="admin-header">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/icons/logo-full.svg"
              height={32}
              width={162}
              alt="logo"
              className="h-8 w-fit"
            />
          </Link>
  
          <div className='flex gap-5 items-center'>
            <NotificationComp/>
            <OptionAdmin/>
          </div>
        </header>
    )
  }