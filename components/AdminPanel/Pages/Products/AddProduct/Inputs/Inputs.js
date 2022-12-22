import { TextField } from "@mui/material";
import React from "react";

import Title from "../../../../Title/Title";

import classes from "./Inputs.module.scss";

export default function Inputs({
  title,
  titleChange,
  persianTitle,
  persianTitleChange,
  weight,
  weightChange,
  showWeight,
  showWeightChange,
  slug,
  slugChange,
  errors,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Title title="اطلاعات محصول" />
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <TextField
          color="lightBlue"
          error={Boolean(errors?.title)}
          helperText={errors?.title?.[0]}
          autoFocus
          margin="dense"
          id="name"
          label="عنوان انگلیسی"
          type="text"
          fullWidth
          variant="standard"
          onChange={titleChange}
          value={title}
        />
        <TextField
          color="lightBlue"
          error={Boolean(errors?.persian_title)}
          helperText={errors?.persian_title?.[0]}
          autoFocus
          margin="dense"
          id="name"
          label="عنوان فارسی"
          type="text"
          fullWidth
          variant="standard"
          onChange={persianTitleChange}
          value={persianTitle}
        />
        <TextField
          color="lightBlue"
          error={Boolean(errors?.weight)}
          helperText={errors?.weight?.[0]}
          autoFocus
          margin="dense"
          id="name"
          label="وزن"
          type="text"
          fullWidth
          variant="standard"
          onChange={weightChange}
          value={weight}
        />
        <TextField
          color="lightBlue"
          error={Boolean(errors?.show_weight)}
          helperText={errors?.show_weight?.[0]}
          autoFocus
          margin="dense"
          id="name"
          label="وزن نمایشی"
          type="text"
          fullWidth
          variant="standard"
          onChange={showWeightChange}
          value={showWeight}
        />
        <TextField
          color="lightBlue"
          error={Boolean(errors?.slug)}
          helperText={errors?.slug?.[0]}
          autoFocus
          margin="dense"
          id="name"
          label="لینک"
          type="text"
          fullWidth
          variant="standard"
          onChange={slugChange}
          value={slug}
        />
      </div>
    </div>
  );
}
