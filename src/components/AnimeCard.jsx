import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ImgMediaCard({ title, description, src }) {
  let newDescription;

  if (description !== null) {
    newDescription =
      description?.length > 100
        ? description.slice(0, 100) + "..."
        : description;
  } else {
    newDescription =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae nisi, asperiores placeat accusamus deserunt...";
  }
  let trimTitle = title?.length > 20 ? title.slice(0, 20) + "..." : title;

  return (
    <Card sx={{ maxWidth: 345 }} className="max-h-[40rem]">
      <CardMedia
        component="img"
        alt={title}
        image={src}
        className="bg-blue-400 border-8 border-black w-full object-contain max-h-[70vh]"
      />
      <CardContent className="max-h-[20vh]">
        <Typography gutterBottom variant="h5" component="div" className="">
          {trimTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {newDescription}
        </Typography>
      </CardContent>
      <CardActions className="max-h-[10vh] ">
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
