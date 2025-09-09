import React from 'react'
import { BsChatFill } from 'react-icons/bs'
import { HiDocument, HiHome } from 'react-icons/hi'
import { RiTimeFill } from 'react-icons/ri'
import ProjectName from './ProjectName'
import VLink from './VLink'

type Props = {
  params: { "g-id": string }
}

const navItems = [
  { href: "", label: "Home", icon: <HiHome /> },
  { href: "meetings", label: "Meetings", icon: <BsChatFill /> },
  { href: "documents", label: "Documents", icon: <HiDocument /> },
  { href: "timeline", label: "Timeline", icon: <RiTimeFill /> },
];

function VerticleNavBar({ params }: Props) {
  const baseurl = `/group/${params['g-id']}`

  return (
    <>
      <ProjectName id={params['g-id']} />
      <div className="fixed top-20 left-0 h-full w-20 bg-white shadow-md border-r-2 border-amber-400">
        <nav className="flex flex-col items-center p-4 gap-9 justify-between text-xl font-bold">
          {navItems.map((item) => (
            <VLink 
              key={item.label} 
              baseurl={baseurl} 
              href={item.href} 
              label={item.label} 
              icon={item.icon} 
            />
          ))}
        </nav>
      </div>
    </>
  )
}

export default VerticleNavBar
