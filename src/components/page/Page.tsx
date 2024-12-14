import PageNavigation from "./PageNavigation";
import { 
  GithubIcon, 
  LinkedInIcon, 
  LogoIcon 
} from "@assets/icons";
import Icon from "@components/base/Icon";
import { OverlayProvider } from "@components/base/Overlay"
import { useWindowResize } from "@hooks/useWindowResize";

/**
 * Props for the Page component.
 *
 * @interface PageProps
 * @property {React.ReactNode} children - The content to be displayed within the Page component.
 */
interface PageProps {
  children: React.ReactNode;
}

/**
 * The `Page` component serves as a layout wrapper for the entire page content.
 * It includes a header with navigation, logo, and social media icons, and a main content area.
 * 
 * @param {PageProps} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed within the page.
 */
export const Page = ({ children }: PageProps) => {
  const { isResizing } = useWindowResize();

  return (
    <div className="min-h-dvh bg-gray-950">
      {/** Header  */}
      <div className="bg-gray-950 text-white text-center p-2 grid grid-cols-3 h-12">
        <PageNavigation />

        <div className="w-min m-auto">
          <a href="/">
            <LogoIcon className="h-6 w-6 fill-white cursor-pointer" />
          </a>
        </div>

        <div className="flex justify-end">
          <Icon primary={GithubIcon} href="https://github.com/svengrav" />
          <Icon primary={LinkedInIcon} href="https://www.linkedin.com/in/svengrav/" className="ml-4 mr-2" />
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
          <OverlayProvider>
          {children}
          </OverlayProvider>
        )}
      </div>
    </div>
  );
}

export default Page;