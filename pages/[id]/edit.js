import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { Confirm, Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const EditNote = ({ note }) => {
  const [form, setForm] = useState({
    title: note.title,
    description: note.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});


  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const updateNote = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/notes/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};
    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }
    return err;
  };

  // **************DELETE BUTTON****************
  // const [confirm, setConfirm] = useState(false);
  // const [isDeleting, setIsDeleting] = useState(false);
  // useEffect(() => {
  //   if (isDeleting) {
  //     deleteNote();
  //   }
  // }, [isDeleting]);

  // const open = () => setConfirm(true);
  // const close = () => setConfirm(false);

  // const deleteNote = async () => {
  //   try {
  //     const deleted = await fetch(
  //       `http://localhost:3000/api/notes/${router.query.id}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );
  //     router.push("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleDelete = async () => {
  //   setIsDeleting(true);
  //   close();
  // };

  return (
    <div className="form-container">
      <h1>Edit Note</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "below" }
                  : null
              }
              label="Title"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <Form.TextArea
              fluid
              error={
                errors.description
                  ? { content: "Please enter a description", pointing: "below" }
                  : null
              }
              label="Description"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <Button primary type="submit">
              Update
            </Button>
            {/* <Button type="button" color="red" onClick={open}>
              Delete
            </Button>
            <Confirm
              open={confirm}
              onCancel={close}
              onConfirm={handleDelete}
              header='Delete Note'
              content='Are you sure you want to delete this note?'
            /> */}
            <Link href={"/"}>
              <Button>Back</Button>
            </Link>
          </Form>
        )}
      </div>
    </div>
  );
};

EditNote.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();

  return { note: data };
};

export default EditNote;
