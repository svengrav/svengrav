import Navigation from "./Navigation";
import { GithubIcon, LinkedInIcon, Logo, LogoIcon } from "../assets/icons";
import Icon from "./Icon";
import { useWindowResize } from "../hooks/useWindowResize";

interface PageProps {
  children: React.ReactNode;
}

/**
 * Page wrapper.
 * @param children
 * @returns Page
 */
export default function Page({ children }: PageProps) {
  const { isResizing } = useWindowResize();

  return (
    <div className="min-h-dvh bg-gray-950">
      {/** Header  */}
      <div className="bg-gray-950 text-white text-center p-2 grid grid-cols-3 h-12">
        <Navigation />

        <div className="w-min m-auto">
          <a href="/">
            <LogoIcon className="h-6 w-6 fill-white cursor-pointer" />
          </a>
        </div>

        <div className="flex justify-end">
          <Icon onIconOpen={GithubIcon} label="" href="https://github.com/svengrav" />
          <Icon onIconOpen={LinkedInIcon} label="" href="https://www.linkedin.com/in/svengrav/" className="ml-4 mr-2" />
        </div>
      </div>

      {/** Page Content  */}
      <div className="relative min-h-[calc(100vh_-_48px)] overflow-x-hidden">
        {isResizing ? (
          <div className="w-full p-6 text-center">
            <span className="text-white w-full uppercase mt-8 border rounded-md p-4">
              Resizing window...
            </span>
            
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
