"use client";

import { useRef, useState } from "react";
import { BsFillCloudArrowUpFill, BsFillTrashFill } from 'react-icons/bs'
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export function DragAndDrop() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);

  const router = useRouter();


  // File validation function
  function validateFiles(files: FileList) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'text/plain'];
    let imgFile = null;
    let txtFile = null;

    for (const file of files) {
      console.log('file', file.type);

      if (allowedTypes.includes(file.type)) {
        if (file.type.startsWith('image/')) {
          imgFile = file;
        } else if (file.type === 'text/plain') {
          console.log('inside');
          txtFile = file;
        }
      }
    }

    if (imgFile && txtFile) {
      // Both files are present, perform your desired action
      return true
    } else {
      // At least one of the required files is missing
      toast.error('Please upload both an image and a text file.');
      return false
    }
  }

  function handleChange(e: any) {
    e.preventDefault();

    if (files.length < 2) {
      if (e.target.files && e.target.files[0]) {
        console.log(e.target.files);

        for (let i = 0; i < e.target.files["length"]; i++) {
          setFiles((prevState: any) => [...prevState, e.target.files[i]]);
        }
      }
    } else {
      toast.error('Please upload only one image file and one detection file ')
    }

  }

  async function handleSubmitFile(e: any) {
    if (files.length === 0) {
      // no file has been submitted
      toast.error('Please drag files')
    } else {

      try {
        const data = new FormData()
        // Append all selected files to the formData
        for (let i = 0; i < files.length; i++) {
          data.append('files', files[i]);
        }

        const res = await axios.post('/api/upload', data)
        if (!res) {
          toast.error('something went wrong')
        }
        if (res) {
          toast.success('uploaded successfully')
          router.push('/');
        }
      } catch (e: any) {
        console.error(e)
      }

    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (files.length < 2) {
      const isCorrect = validateFiles(e.dataTransfer.files);
      if (isCorrect) {
        if (e.dataTransfer.files["length"] <= 2) {
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
              setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
            }
          }
        } else {
          toast.error('Please drag only two files, one img file & 1 detection file')
        }
      } else {
        toast.error('Please drag only two files, one img file & 1 detection file')
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }



  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className=
        {
          `
        ${dragActive ? "bg-gray-400" : "bg-white"
          } 
         dark:bg-gray-100
         p-4 w-[55%] rounded-lg  min-h-[13rem] text-center flex flex-col items-center justify-center border-dashed border-gray-600 border-2 `}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}

      >
        {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        />

        <p className="flex dark:text-black font-semibold">
          <BsFillCloudArrowUpFill size='1.5rem' className="mx-2" />
          Drop files to Attach or
          <span
            className="font-bold text-blue-600 cursor-pointer"
            onClick={openFileExplorer}
          >
            <u>Select files</u>
          </span>
          to browse
        </p>

        <div className="flex flex-col items-center justify-center p-3">
          {files.map((file: any, idx: any) => (
            <div key={idx} className="flex flex-row my-1 items-center space-x-7">
              <span className="text-black">{file.name}</span>

              <BsFillTrashFill color="red" size="1.2rem" className="cursor-pointer" onClick={() => removeFile(file.name, idx)} />

            </div>
          ))}
        </div>
        <Button onClick={handleSubmitFile} className="dark:bg-black text-white" >Upload</Button>
      </form>
    </div>
  );
}
