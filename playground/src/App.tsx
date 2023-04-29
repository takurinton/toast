import { ToastProvider, useToast } from "@takurinton/toast";

const Component = () => {
  const { toast, closeAll } = useToast();

  return (
    <>
      <h1 className="text-5xl font-bold mb-8">Toast</h1>
      <div className="flex flex-row justify-center space-x-4">
        <div className="flex flex-row space-x-4">
          <div className="border border-gray-400 rounded-lg p-4 h-fit">
            <h2 className="text-lg font-bold mb-4">position</h2>
            <div className="flex flex-col">
              <button
                className="bg-green-400 hover:bg-green-300 text-white font-bold my-2 px-4 py-2 rounded"
                onClick={() =>
                  toast({
                    placement: "top",
                    text: "top",
                  })
                }
              >
                top
              </button>
              <button
                className="bg-blue-400 hover:bg-blue-300 text-white font-bold my-2 px-4 px-4 py-2 rounded"
                onClick={() =>
                  toast({
                    placement: "top-start",
                    text: "top-start",
                  })
                }
              >
                top-start
              </button>
              <button
                className="bg-red-400 hover:bg-red-300 text-white font-bold my-2 px-4 px-4 py-2 rounded"
                onClick={() =>
                  toast({
                    placement: "top-end",
                    text: "top-end",
                  })
                }
              >
                top-end
              </button>
              <button
                className="bg-purple-400 hover:bg-purple-300 text-white font-bold my-2 px-4 px-4 py-2 rounded"
                onClick={() =>
                  toast({
                    placement: "bottom",
                    text: "bottom",
                  })
                }
              >
                bottom
              </button>
              <button
                className="bg-orange-400 hover:bg-orange-300 text-white font-bold my-2 px-4 px-4 py-2 rounded"
                onClick={() =>
                  toast({
                    placement: "bottom-start",
                    text: "bottom-start",
                  })
                }
              >
                bottom-start
              </button>
              <button
                className="bg-pink-400 hover:bg-pink-300 text-white font-bold my-2 px-4 px-4 py-2 rounded"
                onClick={() =>
                  toast({
                    placement: "bottom-end",
                    text: "bottom-end",
                  })
                }
              >
                bottom-end
              </button>
            </div>
          </div>
          <div className="border border-gray-400 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">deley</h2>
            <div className="flex flex-col">
              <button
                className="bg-green-400 hover:bg-green-300 text-white font-bold my-2 px-4 px-4 py-2 rounded"
                onClick={() =>
                  toast({
                    placement: "top",
                    autoClose: false,
                    text: "no auto close",
                  })
                }
              >
                no auto close
              </button>
              <button
                className="bg-blue-400 hover:bg-blue-300 text-white font-bold my-2 px-4 px-4 py-2 rounded"
                onClick={() =>
                  toast({
                    placement: "top",
                    delay: 500,
                    text: "deley 500ms",
                  })
                }
              >
                deley 500ms
              </button>
            </div>
          </div>
          <div className="border border-gray-400 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">custom</h2>
            <div className="flex flex-col">
              <button
                className="bg-green-400 hover:bg-green-300 text-white font-bold my-2 px-4 px-4 py-2 rounded"
                onClick={() =>
                  toast({
                    placement: "top",
                    text: "with close button",
                    closeable: true,
                  })
                }
              >
                with close button
              </button>
              <button
                className="bg-red-400 hover:bg-red-300 text-white font-bold my-2 px-4 px-4 py-2 rounded"
                onClick={() =>
                  toast({
                    placement: "top",
                    transition: {
                      duration: 3000,
                    },
                    text: "duration 3000ms",
                  })
                }
              >
                animation(duration: 3000ms)
              </button>
              <button
                className="bg-purple-400 hover:bg-purple-300 text-white font-bold my-2 px-4 px-4 py-2 rounded"
                onClick={() =>
                  toast({
                    placement: "top",
                    render: () => (
                      <div className="w-[300px] bg-purple-300 p-4 mb-4 rounded-lg shadow-lg flex justify-between items-center">
                        custom component
                      </div>
                    ),
                  })
                }
              >
                custom component
              </button>
              <button
                className="bg-purple-400 hover:bg-purple-300 text-white font-bold my-2 px-4 px-4 py-2 rounded"
                onClick={closeAll}
              >
                close all
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <ToastProvider>
      <Component />
    </ToastProvider>
  );
}

export default App;
