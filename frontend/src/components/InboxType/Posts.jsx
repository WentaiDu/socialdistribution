import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import React, { Fragment } from "react";
import { cloneDeep } from "lodash";

export default function Posts({
  title,
  author,
  description,
  content,
}) {
  return (
<Container sx={{ width: 750, m: "auto", p: { xs: 2 } }}>
      <FormControl component="fieldset" display="flex" sx={{ m: 3 }}>
        <br />
        <Typography id="title" variant="h6">{title}</Typography>
        <br />
        <Typography id="author" variant="subtitle2">{author}</Typography>
        <br />
        <Typography id="description" variant="body2">{description}</Typography>
        <br />
        <Typography id="content" variant="body2">{content}</Typography>
      </FormControl>
    </Container>
  );
}