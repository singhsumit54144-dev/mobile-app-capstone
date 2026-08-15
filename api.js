export const fetchApiData = async (setApiData) => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const data = await res.json();
    setApiData(data);
  } catch (e) {
    console.error(e);
  }
};
