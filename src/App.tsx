const App = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-red-500">
      <img
        src="/logo.png"
        alt="Happy Sushi"
        width={140}
        height={140}
        className="h-[140px] w-[140px] animate-bounce"
      />

      <h1 className="flex text-2xl">Welcome to Sushi Chat!</h1>

      <span className="text-sm">By: Thiago Paz</span>
    </div>
  );
};

export { App };
