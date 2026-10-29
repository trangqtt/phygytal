import { AvatarIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import BackIcon from '../assets/back-icon.png';
import { fingerPrint, nomionLogo } from '../assets/index';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/common/shadcn-ui-kit/dropdown-menu';
import { userInfoKey } from '../constants';
import { useAppDispatch } from '../state/hooks';
import { logout } from '../state/userSlice';

interface HeaderProps {
  pathName: string;
  activeToggle: boolean;
  toggleActive: () => void;
}

export default function Header({ pathName, activeToggle, toggleActive }: HeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logOutUser = () => {
    dispatch(logout());
    navigate('/login');
    localStorage.removeItem(userInfoKey);
  };
  return (
    <div className="bg-white w-screen h-16 z-50 fixed flex flex-row justify-between items-center px-4 border">
      <div className="flex justify-between items-center gap-12">
        <div className="flex justify-between items-center">
          <img className="h-10 object-cover" src={fingerPrint} alt="Nomion" />
          <img className="h-10 object-cover" src={nomionLogo} alt="Nomion" />
        </div>
        {/* <div onClick={toggleActive} className="flex items-center gap-2">
          <img
            className="mr-2 h-6 object-cover transition-transform duration-200"
            src={BackIcon}
            alt="Nomion"
            style={{ rotate: activeToggle ? '180deg' : '' }}
          />
          <p className="text-black text-base flex-row">{pathName}</p>
        </div> */}
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3">
            User
            <AvatarIcon className="w-6 h-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuItem onClick={logOutUser}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
