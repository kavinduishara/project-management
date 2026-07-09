"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

type VLinkProps = {
  baseurl: string;
  href: string;
  label: string;
  icon: React.ReactNode;
}

const VLink = ({ baseurl, href, label, icon }: VLinkProps) => {
    const path = usePathname();
    const fullPath = `${baseurl}${href ? `/${href}` : ""}`;
    const isActive = path === fullPath;  // exact match
    return (
        <Link 
          href={fullPath} 
          aria-label={label} 
          className={`w-full p-2 m-2 text-3xl  hover:text-green-800 ${isActive ? "text-red-500 border-r-4 border-green-500 bg-gradient-to-l" : "text-black border-0"} transition-all duration-150`}
        >
          {icon}
        </Link>
    )
}

export default VLink
