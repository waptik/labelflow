import { useCallback, useState, useEffect } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { isEmpty } from "lodash";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export const ImportImagesModal = ({
  onImportSucceed,
  isOpen = false,
  onClose = () => {},
}: {
  onImportSucceed: (images: Array<File>) => void;
  isOpen?: boolean;
  onClose?: () => void;
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    onImportSucceed(acceptedFiles);
  }, []);
  const [{ acceptedFiles, fileRejections }, setDropzoneResult] = useState<{
    acceptedFiles?: Array<File>;
    fileRejections?: Array<FileRejection>;
  }>({});

  const dropzoneResult = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/bmp",
  });

  useEffect(() => {
    if (!dropzoneResult.acceptedFiles && !dropzoneResult.fileRejections) return;
    setDropzoneResult({
      acceptedFiles: dropzoneResult.acceptedFiles,
      fileRejections: dropzoneResult.fileRejections,
    });
  }, [dropzoneResult.acceptedFiles, dropzoneResult.fileRejections]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setDropzoneResult({ acceptedFiles: [], fileRejections: [] });
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <h2>Import</h2>
          <p>
            Start working with your images. Stay in control of your data. Images
            are not uploaded on LabelFlow servers.
          </p>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isEmpty(acceptedFiles) && isEmpty(fileRejections) ? (
            <form {...dropzoneResult.getRootProps()}>
              <label htmlFor="file-uploader">
                Drop folders or images
                <input {...dropzoneResult.getInputProps()} id="file-uploader" />
              </label>
            </form>
          ) : (
            <>
              {!isEmpty(fileRejections) && (
                <section>
                  <h3>{fileRejections?.length} items rejected</h3>
                  <ul>
                    {fileRejections?.map((rejection) => (
                      <li key={rejection.file.name}>
                        <span>{rejection.file.name}</span>
                        <span
                          title={rejection.errors
                            .map((e) => e.message)
                            .join(". ")}
                        >
                          {rejection.errors.length} errors
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {!isEmpty(acceptedFiles) && (
                <section>
                  <h3>Uploading {acceptedFiles?.length} items</h3>
                  <ul>
                    {acceptedFiles?.map((f) => (
                      <li key={f.name}>{f.name}</li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
