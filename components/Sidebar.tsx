'use client';

import { 
  Command, 
  CommandList, 
  CommandItem 
} from '@/components/ui/command';

import { 
  LayoutDashboard, 
  Newspaper, 
  Tag, 
  Store, 
  MapPin, 
  User 
} from 'lucide-react';

import Link from 'next/link';

const Sidebar = () => {
  return (
    <Command className="bg-secondary rounded-none">
      <CommandList>
        <Link href="/" className="block">
          <CommandItem className="hover:hover:bg-hover-button hover:text-cyan-100 transition-colors flex flex-col items-center p-3 cursor-pointer">
            <LayoutDashboard className="h-6 w-8 mb-3" />
            Dashboard
          </CommandItem>
        </Link>

        <Link href="/packages" className="block">
          <CommandItem className="hover:hover:bg-hover-button hover:text-cyan-100 transition-colors flex flex-col items-center p-3 cursor-pointer">
            <Newspaper className="h-6 w-8 mb-3" />
            Packages
          </CommandItem>
        </Link>

        <Link href="/etagtypes" className="block">
          <CommandItem className="hover:hover:bg-hover-button hover:text-cyan-100 transition-colors flex flex-col items-center p-3 cursor-pointer">
            <Tag className="h-6 w-8 mb-3" />
            E-Tag
          </CommandItem>
        </Link>

        <Link href="/market-zone" className="block">
          <CommandItem className="hover:bg-hover-button hover:text-cyan-100 transition-colors flex flex-col items-center p-3 cursor-pointer">
            <MapPin className="h-6 w-8 mb-3" />
            Market Zone
          </CommandItem>
        </Link>

        <Link href="/store" className="block">
          <CommandItem className="hover:bg-hover-button hover:text-cyan-100 transition-colors flex flex-col items-center p-3 cursor-pointer">
            <Store className="h-6 w-8 mb-3" />
            Store
          </CommandItem>
        </Link>

        <Link href="/users" className="block">
          <CommandItem className="hover:bg-hover-button hover:text-cyan-100 transition-colors flex flex-col items-center p-3 cursor-pointer">
            <User className="h-6 w-8 mb-3" />
            Users
          </CommandItem>
        </Link>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
