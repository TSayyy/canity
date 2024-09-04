export function LoadingRoadmap() {
  return (
    <div className="flex flex-col space-y-20 justify-center items-center min-h-[50vh] bg-dark-navy p-10">
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold tracking-tight leading-normal text-balance text-center">
        Generating your own Roadmap
      </h2>
      <div className="flex space-x-2 justify-center items-center ">
        <span className="sr-only">Loading...</span>
        <div className="h-6 w-6 bg-mint-green rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-6 w-6 bg-mint-green rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-6 w-6 bg-mint-green rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
