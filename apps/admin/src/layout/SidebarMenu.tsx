import clsx from 'clsx';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/common/shadcn-ui-kit/accordion';

import { adminRoutes } from '../config/routes';
import { UserRole } from '../routes';
import { DotIcon } from '../components/icons';

interface SidebarMenuProps {
  className: string;
  userRole: UserRole;
  activeToggle?: boolean;
}

export const getActiveNavFromLocation = (
  pathname: string,
  userRole: UserRole,
  callback: (value: React.SetStateAction<string>) => void
) => {
  if (userRole === UserRole.ORG_ADMIN) {
    for (let nav of adminRoutes) {
      if (!!nav.key && pathname.includes(nav.key)) {
        {
          if (nav.subnav) {
            for (let subnav of nav.subnav) {
              if (!!subnav.key && pathname.includes(subnav.key)) {
                callback(subnav.key);
                break;
              }
            }
          } else {
            callback(nav.key);
            break;
          }
        }
        break;
      }
    }
  }
};

export default function SidebarMenu({
  className,
  userRole,
  activeToggle,
}: SidebarMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    if (location) {
      getActiveNavFromLocation(location.pathname, userRole, setNavItem);
    }
  }, [location]);
   
  // const [isHovering, setIsHovering] = React.useState<boolean>(false);

  const [navItem, setNavItem] = React.useState<string>('');
  const handleClickItem = (item: any) => {
    if (item.subnav) {
      return;
    }
    setNavItem(item.key);
    navigate(item.key);
  };

  return (
    <div className={clsx(className)}>
      <Accordion type="multiple">
        {userRole === UserRole.ORG_ADMIN &&
          adminRoutes.map((element, index) => (
            <AccordionItem value={element.key} key={index}>
              <AccordionTrigger
                className={clsx(
                  'cursor-pointer gap-5 p-3 text-gray-primary rounded-lg',
                  'hover:bg-blue-primary-50 hover:text-blue-primary-500 hover:transition hover:duration-100 hover:ease-linear',
                  navItem === element.key && 'bg-blue-primary-50 text-blue-primary-500'
                )}
                itemScope={element?.subnav?.length || 0 > 0 ? true : false}
                hidden={activeToggle}
                onClick={() => handleClickItem(element)}
                // onMouseOver={()=>setIsHovering(true)}
                // onMouseOut={()=>setIsHovering(false)}
              >
                <div
                  className={clsx(
                    'flex justify-between items-center gap-4 transition-all duration-300 ease-linear',
                    activeToggle && 'hidden'
                  )}
                >
                  <element.icon className="w-6 h-6 [&>*]:fill-neutral-6" />
                  {element.label}
                </div>
                <div className={clsx(activeToggle ? 'block' : 'hidden', 'm-auto')}>
                  <element.icon className="w-6 h-6 [&>*]:fill-neutral-6" />
                </div>
              </AccordionTrigger>
              {element.subnav?.map((item: any, index: any) => (
                  <>
                    <AccordionContent
                      className={clsx(
                        'my-1 cursor-pointer text-gray-primary rounded-lg',
                        'hover:bg-blue-primary-50 hover:text-blue-primary-500 hover:transition hover:duration-100 hover:ease-linear',
                        navItem === item.key &&
                          'bg-blue-primary-50 text-blue-primary-500',
                        activeToggle ? '' : 'pl-8'
                      )}
                      key={index}
                      onClick={() => handleClickItem(item)}
                    >
                      <div
                        className={clsx(
                          'flex justify-start items-center gap-4',
                          activeToggle && 'hidden'
                        )}
                      >
                        <DotIcon />
                        {item.label}
                      </div>
                    </AccordionContent>
                  </>
                ))}
            </AccordionItem>
          ))}
      </Accordion>
      <span className='text-gray-primary text-sm italic'>Version: 1.0.0</span>
    </div>
  );
}
