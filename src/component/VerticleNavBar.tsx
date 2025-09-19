import React from 'react'
import { BsChatFill, BsPeople, BsPeopleFill } from 'react-icons/bs'
import { HiDocument, HiHome } from 'react-icons/hi'
import { RiTimeFill } from 'react-icons/ri'
import ProjectName from './ProjectName'
import VLink from './VLink'
import { TfiBlackboard } from 'react-icons/tfi'
import { FaTasks } from 'react-icons/fa'

type Props = {
  params: { "g-id": string }
}

const navItems = [
  { href: "", label: "Home", icon: <HiHome /> },
  { href: "timeline", label: "Timeline", icon: <FaTasks/> },
  { href: "chats", label: "Chats", icon: <BsChatFill /> },
  { href: "board", label: "Board", icon: <TfiBlackboard /> },
  
];

function VerticleNavBar({ params }: Props) {
  const baseurl = `/group/${params['g-id']}`

  return (
    <>
      <div className="fixed top-20 left-0 h-full w-20 bg-white shadow-md border-r-1 border-gray-300">
        <nav className="flex flex-col items-center p-4 gap-5 justify-between text-xl font-bold">
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
