import { format } from "date-fns";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import Icon from "@/components/common/Icon";
import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import useCustomUpload from "@/hooks/useCustomUpload";
import { convertFileUrlToFileArray } from "@/lib/index";
import { UseFormPropsType } from "@/types/type";

import Input from "../Input";

type FileType = File & {
  lastModifiedDate: Date;
};
type UploadedFilesType = {
  id: string;
  previewUrl: string;
  file: FileType;
}[];
type FileEvent = ChangeEvent<HTMLInputElement> & {
  target: EventTarget & { files: FileList };
};
interface IFileUploadProps extends UseFormPropsType {
  name: string;
  multiple?: boolean;
  fileAccept?: string;
  data?: [];
  placeholder?: string;
  onChange?: any;
  maxSize?: number;
}

export default function FileUpload({
  name,
  register,
  setValue,
  multiple,
  fileAccept = "image/*",
  data,
  placeholder,
  onChange,
  maxSize,
}: IFileUploadProps) {
  const [inputRef, onFileUpload] = useCustomUpload();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesType>([]);

  // for edit
  useEffect(() => {
    let uploaded = [];
    if (!data) return;
    // @ts-ignore
    if (data && typeof data?.[0] !== "string") {
      uploaded = data;
    } else {
      uploaded = convertFileUrlToFileArray(data);
    }
    // @ts-ignore
    setUploadedFiles(uploaded);
  }, [data]);

  // register form element to useForm
  useEffect(() => {
    register(name);

    // setValue(name, []);
  }, [register, name, setValue]);

  const handleFileUpload = (event: FileEvent) => {
    const { files } = event.target;
    // console.log('files');
    const fileSize = files[0].size / 1024 ** 2;
    if (maxSize && fileSize > maxSize) {
      toast.warning(`File size should not exceed ${maxSize}MB`);
      return;
    }
    const uploaded = Array.from(files)?.map((file) => ({
      id: uuidv4(),
      previewURL: URL.createObjectURL(file),
      file,
    }));
    const uploadedFilesState = multiple
      ? [...uploadedFiles, ...uploaded]
      : uploaded;
    //   @ts-ignore
    setUploadedFiles(uploadedFilesState);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    setValue && setValue(name, uploadedFilesState, { shouldDirty: true });
    onChange?.(uploadedFiles);
  };

  function downloadBlob(blobURL: string, fileName: string) {
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleDeleteFile = (
    id: string,
    fileToDelete: Record<string, string> | File
  ) => {
    if (!multiple || fileToDelete instanceof File) {
      const updatedData = uploadedFiles.filter((file) => file?.id !== id);
      setUploadedFiles(updatedData);
      setValue(name, updatedData, { shouldDirty: true });
    } else {
      setValue("documentToDelete", id);
    }
  };

  return (
    <FlexColumn gap={5}>
      <FlexColumn
        className="cursor-pointer items-center justify-center rounded-lg border border-dashed border-[#E6E6E6] bg-[#FAFAFA] px-5 py-3 duration-200 hover:border-primary-500"
        //   @ts-ignore
        onClick={onFileUpload}
      >
        <CloudUpload
          name="cloud_upload"
          className="text-3xl text-primary-700"
        />
        <p className="text-xs font-medium text-gray-500">
          {placeholder || "Please upload picture (jpeg, png file format)"}
        </p>
        <Input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          onChange={handleFileUpload}
          accept={fileAccept}
        />
      </FlexColumn>
      {multiple && (
        <FlexRow
          className="group w-full items-center justify-center rounded-md border border-dashed p-3 duration-200 hover:border-primary-500 hover:bg-[#FAFAFA]"
          role="button"
          tabIndex={0}
          //   @ts-ignore
          onClick={onFileUpload}
        >
          <Input
            ref={inputRef}
            type="file"
            className="hidden"
            multiple={multiple}
            onChange={handleFileUpload}
            accept={fileAccept}
          />
          <span className="text-sm font-medium text-matt-200 group-hover:text-matt-100">
            <span className="text-base">+</span> Add More Documents
          </span>
        </FlexRow>
      )}
      <FlexColumn gap={2} className="scrollbar max-h-52 overflow-auto">
        {/* @ts-ignore */}
        {uploadedFiles.map(({ file, id, previewURL }) => (
          <FlexRow
            key={id}
            className="w-[100%] items-center justify-between rounded-lg px-4 py-2"
          >
            <FlexRow gap={4} className="w-[80%] items-center justify-start">
              <div className="w-[15%]">
                {fileAccept === ".pdf" ? (
                  <div>
                    <Icon
                      name="description"
                      className="rounded-full bg-primary-100 p-2 text-primary-700"
                    />
                  </div>
                ) : (
                  <Image
                    className="aspect-square h-8 w-8 object-cover"
                    src={previewURL}
                    alt=""
                  />
                )}
              </div>
              <FlexColumn className="w-[85%]">
                <h5 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                  {file?.name}
                </h5>
                {file && file?.lastModified && (
                  <p className="text-xs text-gray-600">
                    Uploaded on
                    {format(new Date(file.lastModifiedDate), "MMM dd yyyy")}
                  </p>
                )}
              </FlexColumn>
            </FlexRow>
            <FlexRow gap={2} className="!w-[20%] justify-end">
              <Icon
                name="download"
                className="text-gray-400 duration-200 hover:text-primary-500"
                onClick={() => downloadBlob(previewURL, file?.name)}
              />
              <Icon
                name="delete"
                className="text-gray-400 duration-200 hover:text-red-600"
                onClick={() => handleDeleteFile(id, file)}
              />
            </FlexRow>
          </FlexRow>
        ))}
      </FlexColumn>
    </FlexColumn>
  );
}
