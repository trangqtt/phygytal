import clsx from 'clsx';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { UserRole } from '../routes';
import Header from './Header';
import SidebarMenu from './SidebarMenu';
interface Props {
  title?: string;
  children: React.ReactNode;
  userRole: UserRole;
}

export default function Layout({ children, userRole }: Props) {
  const location = useLocation();
  const [active, setActive] = React.useState<boolean>(false);
  const toggleActive = () => {
    setActive(!active);
  };
  return (
    <div className="overflow-x-hidden">
      <Header
        pathName={location.pathname.split('/')[1]}
        toggleActive={toggleActive}
        activeToggle={active}
      />
      <div className="flex mt-16 flex-row">
        <SidebarMenu
          activeToggle={active}
          userRole={userRole}
          className={clsx(
            'bg-white h-screen fixed flex flex-col justify-between border-r border-gray-200 transition-transform ease-in-out duration-300 pb-20',
            active ? 'w-24 p-2' : 'w-80 p-5'
          )}
        />
        <main className={clsx('w-full p-4', active ? 'ml-24' : 'ml-80')}>{children}</main>
      </div>
    </div>
  );
}
