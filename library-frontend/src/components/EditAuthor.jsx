import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Select from "react-select";
import { EDIT_BIRTHYEAR } from "../mutations";
import { ALL_AUTHORS, ALL_AUTHOR_NAMES } from "../queries";

const EditAuthor = () => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
    },
  });

  const queryResult = useQuery(ALL_AUTHOR_NAMES);
  const authorNames = queryResult.data.allAuthors.map((a) => a.name);
  const authorOptions = authorNames.map((n) => {
    return { value: n, label: n };
  });

  const submit = (evt) => {
    evt.preventDefault();

    editAuthor({
      variables: { name: name.value, setBornTo: Number(born) },
    });

    setName("");
    setBorn("");
  };

  return (
    <form onSubmit={submit}>
      <Select defaultValue={name} onChange={setName} options={authorOptions} />
      <div>
        born
        <input value={born} onChange={({ target }) => setBorn(target.value)} />
      </div>
      <button type="submit">update author</button>
    </form>
  );
};

export default EditAuthor;
