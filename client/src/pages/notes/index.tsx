import { useLocation, useNavigate } from "react-router-dom";
import { notesContext } from "../../hooks";
import { Notes as NotesUtils } from "../../utils";
import React from "react";
import { Spinner } from "../../components";

const Notes = () => {
  const notesID = useLocation().pathname.split("/")[2];
  const { notes } = notesContext.useNotesContext();
  const navigate = useNavigate();

  const [currentNote, setCurrentNote] = React.useState<NotesType>({
    title: "",
    content: "",
    createdAt: new Date(),
  });

  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(true);

  const getCurrentNote = async () => {
    try {
      const response = await NotesUtils.getOneNote(notesID);
      setCurrentNote(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (notes.data.length > 0) {
      setCurrentNote(notes.data.filter((item) => item._id === notesID)[0]);
    } else {
      getCurrentNote();
    }
  }, [notes]);

  const onCancelEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    getCurrentNote();
    setEdit(true);
  };
  const onSaveEdit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      setLoading(true);
      await NotesUtils.updateNote({
        ...currentNote,
        id: notesID,
      });
      setEdit(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onNoteDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      setLoading(true);
      await NotesUtils.deleteNote(notesID);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-full h-full p-2 relative">
      <div className="font-bold text-xl mb-2">
        <input
          className="py-1 w-full"
          type="text"
          value={currentNote.title}
          onChange={(e) =>
            setCurrentNote({ ...currentNote, title: e.currentTarget.value })
          }
          disabled={edit}
          style={
            edit
              ? { background: "transparent", textAlign: "center" }
              : { background: "#ccc" }
          }
        />
      </div>
      <div className="mb-2">
        {edit ? (
          <a
            href={currentNote.instrumental}
            target="_blank"
            className="text-indigo-500 hover:underline overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {currentNote.instrumental}
          </a>
        ) : (
          <input
            type="text"
            value={currentNote.instrumental}
            onChange={(e) =>
              setCurrentNote({
                ...currentNote,
                instrumental: e.currentTarget.value,
              })
            }
            style={{ background: edit ? "transparent" : "#ccc" }}
          />
        )}
      </div>
      <div className="w-full h-[calc(100%-70px)]">
        <textarea
          className="w-full resize-none h-full"
          disabled={edit}
          value={currentNote.content}
          onChange={(e) =>
            setCurrentNote({ ...currentNote, content: e.currentTarget.value })
          }
          style={{ background: edit ? "transparent" : "#ccc" }}
        ></textarea>
      </div>
      <div className="absolute top-3 right-10">
        {!edit && (
          <>
            <button
              className="uppercase mr-6 text-indigo-600"
              onClick={onSaveEdit}
            >
              Save
            </button>
            <button className="uppercase text-red-500" onClick={onCancelEdit}>
              Cancel
            </button>
          </>
        )}
        {edit && (
          <>
            <button
              className="uppercase mr-6 text-emerald-600"
              onClick={() => setEdit(!edit)}
            >
              Edit
            </button>
            <button className="uppercase text-red-600" onClick={onNoteDelete}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Notes;
