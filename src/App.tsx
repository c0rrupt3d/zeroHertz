import Home from "@/interface/home";
import "@/App.css";

function App() {
  return (
    <>
      <html lang="en" className={`dark`}>
        <body className="dark:bg-black dark:text-white w-full min-h-svh h-svh max-h-svh overflow-hidden">
          <main
            className={`bg-neutral-950 duration-300 flex container h-full max-h-full min-h-full justify-center min-w-full relative `}
          >
            <Home />
          </main>
        </body>
      </html>
    </>
  );
}

export default App;
