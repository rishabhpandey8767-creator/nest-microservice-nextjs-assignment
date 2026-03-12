"use client"

import { useForm } from "react-hook-form"
import {
  TextField,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Paper
} from "@mui/material"

type Field = {
  id: number
  name: string
  fieldType: "TEXT" | "LIST" | "RADIO"
  required?: boolean
  minLength?: number
  maxLength?: number
  defaultValue?: string
  listOfValues1?: string[]
}

type FormData = {
  [key: string]: string
}

export default function DynamicForm({ fields }: { fields: Field[] }) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data)

    localStorage.setItem("signupData", JSON.stringify(data))

    alert("Form submitted successfully!")
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#667eea,#764ba2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2
      }}
    >

      <Paper
        elevation={6}
        sx={{
          padding: 5,
          width: "100%",
          maxWidth: 500,
          borderRadius: 4
        }}
      >

        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={4}
        >
          Signup Form
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>

          {fields.map((field) => {

            // TEXT FIELD
            if (field.fieldType === "TEXT") {
              return (
                <TextField
                  key={field.id}
                  label={field.name}
                  fullWidth
                  margin="normal"
                  defaultValue={field.defaultValue}
                  error={!!errors[field.name]}
                  helperText={
                    errors[field.name]
                      ? `${field.name} is required`
                      : ""
                  }
                  {...register(field.name, {
                    required: field.required,
                    minLength: field.minLength,
                    maxLength: field.maxLength,
                    pattern:
                      field.name === "Email"
                        ? {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format"
                          }
                        : undefined
                  })}
                />
              )
            }

            // LIST (DROPDOWN)
            if (field.fieldType === "LIST") {
              return (
                <FormControl fullWidth margin="normal" key={field.id}>
                  <InputLabel>{field.name}</InputLabel>

                  <Select
                    defaultValue=""
                    label={field.name}
                    {...register(field.name, { required: field.required })}
                  >
                    {field.listOfValues1?.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>

                  {errors[field.name] && (
                    <Typography color="error" variant="body2">
                      {field.name} is required
                    </Typography>
                  )}

                </FormControl>
              )
            }

            // RADIO BUTTON
            if (field.fieldType === "RADIO") {
              return (
                <FormControl key={field.id} margin="normal">

                  <Typography mb={1}>{field.name}</Typography>

                  <RadioGroup row>
                    {field.listOfValues1?.map((item) => (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={
                          <Radio
                            {...register(field.name, {
                              required: field.required
                            })}
                          />
                        }
                        label={item}
                      />
                    ))}
                  </RadioGroup>

                  {errors[field.name] && (
                    <Typography color="error" variant="body2">
                      {field.name} is required
                    </Typography>
                  )}

                </FormControl>
              )
            }

            return null
          })}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              padding: 1.5,
              fontSize: "16px",
              borderRadius: 2
            }}
          >
            Create Account
          </Button>

        </form>

      </Paper>

    </Box>
  )
}