'use client'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';


const BottomBar = () => {
    const pathname = usePathname()
    const { userId } = useAuth()

    return (
        <>
        <section className="bottombar">
            <div className="bottombar_container">
                {
                    sidebarLinks.map((link) => {
                        const href = link.route === '/profile' && userId ? `${link.route}/${userId}` : link.route
                        const isActive = pathname === href || (href.length > 1 && pathname.startsWith(href))

                        return (
                            <Link
                                href={href}
                                key={link.label}
                                className={`bottombar_link ${isActive ? 'bg-primary-500' : ''}`}
                            >
                                <Image
                                    src={link.imgURL}
                                    alt={link.label}
                                    width={24}
                                    height={24}
                                />
                                <p className='text-light-1 text-subtle-medium'>
                                    {link.label}
                                </p>
                            </Link>
                        )
                    }
                )
                }
            </div>

        </section>
        </>
    )
}

export default BottomBar
