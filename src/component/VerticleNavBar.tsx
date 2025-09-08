import Link from 'next/link'
import React from 'react'
import { BsChatFill } from 'react-icons/bs'
import { FcDocument } from 'react-icons/fc'
import { GrDocumentConfig } from 'react-icons/gr'
import { HiDocument, HiHome } from 'react-icons/hi'
import { RiTimeFill } from 'react-icons/ri'

type Props = {
  params: { "g-id": string }
}

function VerticleNavBar({ params }: Props) {
  const baseurl = `/group/${params['g-id']}`

  return (
    <>
    <div className='absolute z-55 -mt-10 mx-70'>{params['g-id']}</div>
    <div className="fixed top-20 left-0 h-full w-20 bg-white shadow-md border-r-2 border-amber-400">
      <nav className="flex flex-col items-center p-4 gap-9 justify-between text-xl font-bold">
        <Link href={`${baseurl}`} aria-label="Home"><HiHome /></Link>
        <Link href={`${baseurl}/meetings`} aria-label="Meetings"><BsChatFill /></Link>
        <Link href={`${baseurl}/documents`} aria-label="Documents" ><HiDocument /></Link>
        <Link href={`${baseurl}/timeline`} aria-label="Timeline"><RiTimeFill /></Link>
      </nav>
    </div>
    </>
    
  )
}

export default VerticleNavBar
