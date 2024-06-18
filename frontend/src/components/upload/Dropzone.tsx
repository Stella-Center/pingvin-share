import { Button, Center, createStyles, Group, Text } from "@mantine/core";
import { Dropzone as MantineDropzone } from "@mantine/dropzone";
import { ForwardedRef, useRef } from "react";
import {  TbUpload } from "react-icons/tb";
import { FormattedMessage } from "react-intl";
import useTranslate from "../../hooks/useTranslate.hook";
import { FileUpload } from "../../types/File.type";
import { byteToHumanSizeString } from "../../utils/fileSize.util";
import toast from "../../utils/toast.util";
import {UploadIcon} from "./UploadIcon";

const useStyles = createStyles((theme) => ({
  wrapper: {
    margin:" 0 auto",
    maxWidth:"600px",
    position: "relative",
    marginBottom: 30,
  },

  dropzone: {
    backgroundColor:"#F3F3F3",
    padding:"60px 40px 40px 40px",
    color:'#000000',
    border:"none",
    '&:hover': {
      backgroundColor: "rgba(44, 46, 51, 0.1)"
    },
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    backgroundColor:'#2D6AB5 !important',
    padding:"10px 40px",
    color:"fff",
    marginTop:"35px"
  },
}));

const Dropzone = ({
  title,
  isUploading,
  maxShareSize,
  showCreateUploadModalCallback,
}: {
  title?: string;
  isUploading: boolean;
  maxShareSize: number;
  showCreateUploadModalCallback: (files: FileUpload[]) => void;
}) => {
  const t = useTranslate();

  const { classes } = useStyles();
  const openRef = useRef<() => void>();
  return (
    <div className={classes.wrapper}>
      <MantineDropzone
        onReject={(e) => {
          toast.error(e[0].errors[0].message);
        }}
        disabled={isUploading}
        openRef={openRef as ForwardedRef<() => void>}
        onDrop={(files: FileUpload[]) => {
          const fileSizeSum = files.reduce((n, { size }) => n + size, 0);

          if (fileSizeSum > maxShareSize) {
            toast.error(
              t("upload.dropzone.notify.file-too-big", {
                maxSize: byteToHumanSizeString(maxShareSize),
              }),
            );
          } else {
            files = files.map((newFile) => {
              newFile.uploadingProgress = 0;
              return newFile;
            });
            showCreateUploadModalCallback(files);
          }
        }}
        className={classes.dropzone}
        radius="md"
      >
        <div style={{ pointerEvents: "none" }}>
          <Group position="center">
          <UploadIcon/>
          </Group>
          <Text align="center" weight={700} size="35px" mt="xl">
            {title || <FormattedMessage id="upload.dropzone.title" />}
          </Text>
          <Text align="center" size="md" mt="md">
            <FormattedMessage
              id="upload.dropzone.description"
              values={{ maxSize: byteToHumanSizeString(maxShareSize) }}
            />
          </Text>
        </div>
        <Center>
          <Button
              className={classes.control}
              variant="filled"
              size="sm"
              radius="xl"
              disabled={isUploading}
              onClick={() => openRef.current && openRef.current()}
          >
            {<TbUpload />}
          </Button>
        </Center>
      </MantineDropzone>
    </div>
  );
};
export default Dropzone;
