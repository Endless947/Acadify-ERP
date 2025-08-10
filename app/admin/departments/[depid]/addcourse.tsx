"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// ✅ Zod schema for validation
const formSchema = z.object({
  course_name: z.string().min(1, "Course name is required"),
  credits: z.number().min(1, "Credits required"),
  num_lectures: z.number().min(1, "Number of lectures required"),
  semester: z.number().min(1).max(8, "Semester must be 1–8"),
});

type FormValues = z.infer<typeof formSchema>;

// ✅ Fields array to iterate
const fields: {
  name: keyof FormValues;
  label: string;
  type?: string;
  placeholder?: string;
}[] = [
  {
    name: "course_name",
    label: "Course Name",
    placeholder: "e.g. Data Structures",
  },
  { name: "credits", label: "Credits", type: "number", placeholder: "e.g. 4" },
  {
    name: "num_lectures",
    label: "Number of Lectures",
    type: "number",
    placeholder: "e.g. 3",
  },
  {
    name: "semester",
    label: "Semester",
    type: "number",
    placeholder: "e.g. 5",
  },
];

export const AddCourseDialog = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course_name: "",
      credits: 0,
      num_lectures: 0,
      semester: 1,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("New course:", data);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">Add Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-bg-dark">
        <DialogHeader>
          <DialogTitle className="text-main-dark">Add New Course</DialogTitle>
          <DialogDescription>
            Fill out the details below to add a new course.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: rhfField }) => (
                  <FormItem>
                    <FormLabel className="text-txt">{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={field.type || "text"}
                        placeholder={field.placeholder}
                        {...rhfField}
                        value={
                          field.type === "number"
                            ? rhfField.value || ""
                            : rhfField.value
                        }
                        onChange={(e) =>
                          field.type === "number"
                            ? rhfField.onChange(parseInt(e.target.value) || 0)
                            : rhfField.onChange(e.target.value)
                        }
                        className="bg-bg-main rounded-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" className="rounded-full">
                  Save Course
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
