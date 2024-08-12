import { Editor } from "./editor/Editor";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 py-4 sm:px-5">
      <h1 className="text-5xl font-bold flex justify-center m-4">
        Simple Text Editor
      </h1>
      <Editor />
    </div>
  );
}
