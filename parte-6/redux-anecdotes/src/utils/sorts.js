export const sortListAnecdotes = (list) => {
  if (!list) return console.log("no hay list");

  const sortlist = list.sort((a, b) => b.votes - a.votes);

  return sortlist;
};
