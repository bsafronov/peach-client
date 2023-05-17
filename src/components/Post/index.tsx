import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { FC } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { API_URL } from "../../api";
import { useAuth } from "../../store/useAuth";

export interface IPost {
  id: number;
  title?: string;
  description?: string;
  userId: string;
  timestamp: number;
}

const Post: FC<IPost> = ({ id, userId, description, title, timestamp }) => {
  const token = useAuth((state) => state.token);
  const date = new Date(timestamp).toLocaleDateString();

  const handleLike = async () => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "PUT",

      headers: {
        Authorization: token as string,
      },
    });
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "coral" }}>R</Avatar>}
        title={"Богдан Сафронов"}
        subheader={date}
      />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
