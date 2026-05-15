const baseurl = "http://localhost:3001/anecdotes";

export const getAnecdote = async () => {
  const data = await fetch(baseurl);

  if (!data.ok) throw new Error("failed in get data of server");

  return await data.json();
};

export const createAnecdote = async (anectode) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(anectode),
  };

  const response = await fetch(baseurl, options);

  if (!response.ok) throw new Error("Failed at creating of new anecdote");
  return await response.json();
};

export const updateVotes = async (anectode) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(anectode),
  };

  const response = await fetch(`${baseurl}/${anectode.id}`, options);

  if (!response.ok) throw new Error("Failed at update votes");

  return await response.json();
};
