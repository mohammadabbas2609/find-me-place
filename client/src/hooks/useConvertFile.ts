import { useState } from "react";

interface returnFile {
  fileAsData: ArrayBuffer | string | null;
  setFile: Function;
}

const useConvertFile = (): returnFile => {
  const [file, setFile] = useState<Blob | null>(null);
  const [fileAsData, setFileAsData] = useState<ArrayBuffer | string | null>(
    null
  );

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFileAsData(reader.result);
    };
    if (fileAsData) {
      return { fileAsData, setFile };
    }
  }

  return { setFile, fileAsData };
};

export default useConvertFile;
