import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={twMerge(
        'flex h-[50px] w-[100%] items-center justify-center rounded-lg bg-green-300 text-lg text-black',
        className,
      )}
    >
      {children}
    </button>
  );
};

export { Button };
