import { BsTwitterX } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { HiMail } from "react-icons/hi";

type SocialCardProps = {
  mail?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  github?: string | null;
  className?: string | null;
  href?: {
    mail?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    linkedin?: string | null;
    github?: string | null;
  };
};

export function SocialCard({ mail, twitter, facebook, github, linkedin, className = "", href }: SocialCardProps) {
  return (
    <div className={`rounded-xl shadow-custom p-5 ${className}`}>
      <div className=" flex flex-col text-lg gap-4 *:flex *:justify-start *:items-center *:gap-2 *:cursor-pointer *:transition-colors *:duration-150">
        {mail !== undefined && (
          <a href={href?.mail ? `mailto:${mail}` : undefined} className=" text-zinc-800 hover:text-royal-blue ">
            <HiMail size={24} /> {mail ? mail : <span className=" text-zinc-400">email is not provided</span>}
          </a>
        )}
        {facebook !== undefined && (
          <a
            href={href?.facebook ? `https://${facebook}` : undefined}
            target="_blank"
            className=" hover:text-royal-blue "
          >
            <BsFacebook size={24} />{" "}
            {facebook ? facebook : <span className=" text-zinc-400">facebook is not provided</span>}
          </a>
        )}
        {twitter !== undefined && (
          <a
            href={href?.twitter ? `https://${twitter}` : undefined}
            target="_blank"
            className=" hover:text-royal-blue "
          >
            <BsTwitterX size={24} />{" "}
            {twitter ? twitter : <span className=" text-zinc-400">twitter is not provided</span>}
          </a>
        )}
        {linkedin !== undefined && (
          <a
            href={href?.linkedin ? `https://${linkedin}` : undefined}
            target="_blank"
            className=" hover:text-royal-blue "
          >
            <BsLinkedin size={24} />{" "}
            {linkedin ? linkedin : <span className=" text-zinc-400">linkedin is not provided</span>}
          </a>
        )}
        {github !== undefined && (
          <a href={href?.github ? `https://${github}` : undefined} target="_blank" className=" hover:text-royal-blue ">
            <BsGithub size={24} /> {github ? github : <span className=" text-zinc-400">github is not provided</span>}
          </a>
        )}
      </div>
    </div>
  );
}
