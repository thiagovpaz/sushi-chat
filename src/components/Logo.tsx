import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({
  width = 140,
  height = 140,
  alt = 'Happy Sushi',
  ...props
}) => {
  return (
    <img {...props} src="/logo.png" width={width} height={height} alt={alt} />
  );
};

export { Logo };
