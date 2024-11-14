import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4">
      <h1 className="text-3xl font-bold">Pinterest-like App</h1>
      <nav className="flex flex-col items-end space-y-2">
        <ul className="flex flex-col items-end space-y-2">
          <a className="text-gray-700 hover:text-gray-900 flex items-center space-x-2" href="#">
            <HomeIcon />
          </a>
          <a className="text-gray-700 hover:text-gray-900 flex items-center space-x-2" href="#">
            <ExploreIcon />
          </a>
          <a className="text-gray-700 hover:text-gray-900 flex items-center space-x-2" href="#">
            <AccountCircleIcon />
          </a>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
