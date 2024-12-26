import PageNavigation from "./PageNavigation";
import { 
  GithubIcon, 
  LinkedInIcon, 
  LogoIcon 
} from "@assets/icons";
import Icon from "@components/base/Icon";
import { PageOverlayProvider } from "@components/page/PageOverlay"
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

  const HEADER_SIZE = 48;

  const contentSize = { minHeight: `calc(100vh - ${HEADER_SIZE}px)`}

  return (
    <div className="min-h-dvh bg-gray-950">
      {/** Header  */}
      <div className="bg-gray-950 text-white text-center p-2 grid grid-cols-3" style={{ height: HEADER_SIZE }}>
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
      <div className="relative overflow-x-hidden " style={contentSize}>
        {isResizing ? (
          <div className="w-full p-6 text-center justify-center items-center flex" style={contentSize}>
            <p className="text-white uppercase">
              Resizing window...
            </p>
          </div>
        ) : (
          <PageOverlayProvider>
          {children}
          </PageOverlayProvider>
        )}
      </div>
    </div>
  );
}

export default Page;