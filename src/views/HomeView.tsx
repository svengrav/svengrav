import { useEffect, useState } from "react";
import { GithubIcon, LinkedInIcon, Logo } from "../assets/icons";
import Page from "../components/Page";
import { Transition } from "@headlessui/react";
import Icon from "../components/Icon";
import { PageDescription, getPageTagColor } from "../core/Page";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";

interface HomeProps {
  panels: PageDescription[];
}

export default function Home({ panels }: HomeProps) {
  const [animateLogo, setAnimateLogo] = useState(false);

  useEffect(() => {
    setAnimateLogo(true);
  }, [animateLogo]);

  return (
    <Page>
      <div className="text-white">
        <div className="py-4 m-auto max-w-screen-xl">
          <Transition
            show={animateLogo}
            enter="transition-all duration-[2000ms]"
            enterFrom="rotate-45"
            enterTo="rotate-0"
          >
            <div>
              <Logo className="bg-transparent fill-gray-100  hover:animate-pulse transition-all transform  h-24 m-auto " />
            </div>
          </Transition>
        </div>

        <div className="text-white m-auto flex flex-initialflex-wrap w-full max-w-screen-xl justify-center py-4 text-sm">
          <Icon
            Primary={GithubIcon}
            label="Github"
            href="https://github.com/svengrav"
          />
          <Icon
            Primary={LinkedInIcon}
            label="Linkedin"
            href="https://www.linkedin.com/in/svengrav/"
            className="ml-4"
          />
        </div>

        <div className="m-auto flex flex-initialflex-wrap w-full max-w-screen-xl justify-center mb-4 items-center px-4">
          A site about software architecture, art and maps. Feel free to contact
          me.
        </div>

        <div className="m-auto flex flex-initial flex-wrap w-full max-w-screen-xl justify-center">
          {panels
            .filter((panel) => !panel.hidden)
            .map((item) => (
              <PanelDetails page={item} />
            ))}
        </div>
      </div>
    </Page>
  );
}

interface PanelDetailsProps {
  page: PageDescription;
}

function PanelDetails({ page }: PanelDetailsProps) {
  return (
    <div
      key={page.id}
      className="w-full sm:w-96 p-2 m-2 relative text-center rounded-sm text-white hover:bg-gray-900 bg-gradient-to-b from-gray-850  hover:border-white border-gray-700 "
    >
      <a href={page.id}>
        <div className="w-full h-40 rounded-md relative">
          <Tags tags={page.tags} />
          {page.thumbnail}
        </div>

        <div className="px-4 py-´">
          <h1 className="font-semibold p-1 text-x mt-2">{page.title}</h1>
          <div className="m-auto w-6 h-[1px] my-2 bg-gray-400" />
          <p className="truncate text-gray-400 mb-2 ">{page.description}</p>
          <span className="text-xs text-gray-400 flex items-center justify-center ">
            <CalendarDaysIcon className="h-4 w-4 mr-2" />{" "}
            {page.date.toDateString()}
          </span>
        </div>
      </a>
    </div>
  );
}

function Tags({ tags }: { tags: any[] | undefined }) {
  return (
    <div className="absolute top-2 z-10">
      {tags?.map((tag) => {
        return (
          <span
            className={`rounded-md py-0.5 px-1.5 shadow-sm text-gray-950 font-semibold uppercase text-xs ml-2 ${getPageTagColor(
              tag
            )}`}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}
