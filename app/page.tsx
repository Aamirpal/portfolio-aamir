import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-4 py-8 md:py-10 -mt-24">
      <div className="inline-block max-w-xl text-center">
        <h1 className={title()}>Building&nbsp;</h1>
        <h1 className={title({ color: "blue" })}>scalable&nbsp;</h1>
        <br />
        <h1 className={title()}>solutions with passion and precision.</h1>
        <h2 className="mt-4">{`Let's build something amazing together.`}</h2>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.linkedin}
        >
          LinkedIn
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
