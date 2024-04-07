export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="flex items-center justify-center h-28 mt-14">
          <div className=" bg-gray-300 dark:bg-gray-400 rounded-md shadow-md">
            <div className="bg-gray-200 dark:bg-gray-500 rounded-md m-3 p-4">
              <h2 className="dark:text-gray">Subheading</h2>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              odit sit facilis? Recusandae, quo nam.
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
