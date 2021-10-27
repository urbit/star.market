import React, { MouseEvent } from 'react';
import { Box, Icon } from '@tlon/indigo-react';

import './Dropdown.scss';

export interface DropdownProps {
  className?: string;
  children: React.ReactNode;
  value: string | React.ReactNode;
  open: boolean;
  toggleOpen: () => void;
}

const Dropdown = ({
  children,
  value,
  open,
  toggleOpen,
  className = '',
}: DropdownProps) => {
  const toggleDropdown = (e: MouseEvent) => {
    e.stopPropagation()
    toggleOpen()
  }

  return (
    <>
      {open && <Box className="dropdown-background" onClick={toggleDropdown} />}
      <Box className={`dropdown ${className}`}>
        <Box className={`selector ${open ? 'open' : ''}`} onClick={toggleDropdown}>
          {value}
          <Icon icon="ChevronSouth" />
        </Box>
        {open && (
          <Box className="content-border">
            <Box className="dropdown-content">{children}</Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Dropdown;
