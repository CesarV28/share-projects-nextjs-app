import Image from 'next/image'
import Link from 'next/link'
import { NavLinks } from '@/constants'
import AuthProviders from './AuthProviders'
import { getCurrentUser } from '@/lib/session'
import ProfileMenu from './ProfileMenu'

const Navbar = async() => {

//   const session = await getCurrentUser();
    const session = {
        user: {
            id: '',
            name: '',
            email: '',
            avatarUrl: '',
        },
        expires: '',
    }

  return (
    <nav className='flex justify-between items-center navbar'>
        <div className='flex-1 flexStart gap-10'>
            <Link href='/'>
                <Image
                    src='/logo.svg'
                    width={ 115 }
                    height={ 43 }
                    alt='Flexibble'
                />
            </Link>
            <ul className='xl:flex hidden text-small gap-7'>
                { NavLinks.map( link => (
                    <Link href={ link.href } key={ link.key } >
                        { link.text }
                    </Link>
                )) }
            </ul>
        </div>

        <div className='flex justify-center items-center gap-4'>
            {false
               ?  (<>
                    <ProfileMenu session={ session }/>
                    <Link href='/create-project'>
                        Share work
                    </Link>
                  </>)
                : (<>
                    {/* <AuthProviders/> */}
                    Provider
                  </>)
            }
        </div>
    </nav>
  )
}

export default Navbar