import React, { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { FieldError } from 'react-hook-form';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

const TextInputBase: React.ForwardRefRenderFunction<
  HTMLInputElement,
  TextInputProps
> = ({ name, className, error = null, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        id={name}
        name={name}
        className={twMerge(
          "focus:ring-0' h-[50px] w-[100%] rounded-md border-2 bg-transparent bg-white p-0 px-3 outline-none",
          '[&:not(:placeholder-shown)]:bg-orange-50',
          className,
        )}
        {...props}
      />
      {!!error && <span className="ml-1 text-red-500">{error.message}</span>}
    </div>
  );
};

export const TextInput = forwardRef(TextInputBase);
