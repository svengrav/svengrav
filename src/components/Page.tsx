import Navigation from './Navigation'
import { GithubIcon, LinkedInIcon, LogoIcon } from '../assets/icons'
import Icon from './Icon'

interface PageProps {
  children: any
}

/**
 * Page wrapper.
 * @param children
 * @returns Page
 */
export default function Page ({ children }: PageProps) {
  return (
    <div className='min-h-dvh bg-gray-950'>

      {/** Header  */}
      <div className='bg-gray-950 text-white text-center p-2 grid grid-cols-3 h-12'>
        <Navigation />

        <div className='w-min m-auto'>
          <a href='/'>
            <LogoIcon className='h-6 w-6 fill-white cursor-pointer' />
          </a>
        </div>

        <div className='flex justify-end'>
          <Icon primary={GithubIcon} label='' href='https://github.com/svengrav' />
          <Icon primary={LinkedInIcon} label='' href='https://www.linkedin.com/in/svengrav/' className='ml-4 mr-2'/>
        </div>

      </div>

      {/** Page Content  */}
      <div className='relative min-h-[calc(100vh_-_48px)] overflow-x-hidden'>
        {children}
      </div>
    </div>
  )
}
