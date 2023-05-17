import {
  Fab,
  useMediaQuery,
  Portal,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { API_URL } from "../../api";
import { useAuth } from "../../store/useAuth";

const PostForm = () => {
  const isTabletPlus = useMediaQuery("(min-width: 600px)");
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { getInputProps, getRootProps, acceptedFiles, isDragActive } =
    useDropzone({ accept: { "image/*": [] }, maxFiles: 4 });
  const { token, user } = useAuth((state) => ({
    token: state.token,
    user: state.user,
  }));

  const handleClose = () => {
    setTitle("");
    setOpen(false);
    setDesc("");
  };

  const handleUpload = async () => {
    // const data = new FormData();
    // for (const item of acceptedFiles) {
    //   data.append("picture", item);
    // }
    // data.append("title", title);
    // data.append("description", desc);
    // console.log(data.get("title"));
    // data.append("userid", JSON.stringify(user?.id));

    const data = {
      title: title,
      description: desc,
      userId: user?.id,
      timestamp: Date.now(),
    };

    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: token as string,
      },
    });

    if (response.ok) {
      handleClose();
    }
  };

  return (
    <>
      <Fab
        size={isTabletPlus ? "medium" : "small"}
        color="secondary"
        sx={{
          position: "fixed",
          bottom: isTabletPlus ? 16 : 64,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Portal>
        <Dialog open={isOpen} onClose={() => setOpen(false)}>
          <DialogTitle>Что у вас нового?</DialogTitle>
          <DialogContent>
            <Stack gap={2}>
              <DialogContentText>
                Ваши мысли будут доступны для чтения всем пользователям...
              </DialogContentText>
              <TextField
                label="Заголовок поста"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Текст поста"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                minRows={5}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <Box
                {...getRootProps()}
                sx={{
                  cursor: "pointer",
                  p: 2,
                  transition: "border-color .2s",
                  border: (state) =>
                    `2px dashed ${
                      isDragActive
                        ? state.palette.primary.light
                        : state.palette.divider
                    }`,
                  ":hover": {
                    borderColor: (state) => state.palette.primary.light,
                  },
                }}
              >
                <input {...getInputProps()} />
                <Typography
                  variant="body2"
                  color={(state) => state.palette.grey[400]}
                >
                  {acceptedFiles.length
                    ? "Нажмите, чтобы выбрать другие фотографии"
                    : "Нажмите на поле, чтобы добавить фотографии"}
                </Typography>
              </Box>
            </Stack>
            <List>
              {acceptedFiles.map((file) => (
                <ListItem key={file.name} sx={{ width: "100%", gap: 2 }}>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText
                    primary={file.name}
                    secondary={`${(file.size / 1024 / 1024).toFixed(1)} мбайт`}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button color="error" variant="text" onClick={handleClose}>
              Отмена
            </Button>
            <Button onClick={handleUpload}>Опубликовать</Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </>
  );
};

export default PostForm;
