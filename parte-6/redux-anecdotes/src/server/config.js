const baseurl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const data = await fetch(baseurl);

  if (!data.ok) throw new Error("failed to los datos");

  return await data.json();
};

export const createNew = async (content) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  };

  const newData = await fetch(baseurl, options);

  if (!newData.ok) throw new Error("can't create anecdote");

  return await newData.json();
};

export const setMoreVotes = async (id, vote) => {
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vote),
  };

  const data = await fetch(`${baseurl}/${id}`, options);
  if (!data.ok) throw new Error("can't update value");

  return data.json();
};
