type PageHeaderProps = {
  title: string;
  description: string;
  image: string;
};

export function PageHeader({ title, description, image }: PageHeaderProps) {
  return (
    <header className="relative flex justify-start items-center min-h-[calc(24rem-85px)] bg-gradient-to-br from-dark-navy via-dark-navy/90 text-white py-20">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className=" absolute inset-0 -z-10 bg-no-repeat bg-right bg-dark-navy bg-cover after:content-[''] after:top-0 after:left-0 after:absolute after:-z-1 after:w-full  after:h-[20%]  after:bg-gradient-to-b after:from-dark-navy after:via-dark-navy/20"
      />
      <main className="container flex flex-col justify-center items-start z-20">
        <h1 className="text-5xl font-semibold">{title}</h1>
        <p className="text-lg mt-4">{description}</p>
      </main>
    </header>
  );
}
