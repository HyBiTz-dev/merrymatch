function TagsInput({ tags, setTags }) {
  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  function removeTag(index) {
    setTags(tags.filter((tag, i) => i !== index));
  }
  return (
    <div className="flex items-center flex-wrap gap-2 border bg-white rounded-lg p-3 w-[66rem]">
      {tags.map((tag, index) => (
        <div
          key={index}
          className=" pt-1 pb-1 pl-2 pr-2 flex flex-wrap gap-2 border-none h-7 bg-purple-100 rounded-lg"
        >
          <span className=" font-medium text-purple-600 text-sm">{tag}</span>
          <span
            onClick={() => {
              removeTag(index);
            }}
            className=" text-purple-600 text-sm"
          >
            x
          </span>
        </div>
      ))}
      <input
        className="border-none bg-white outline-none "
        onKeyUp={(event) => addTags(event)}
        type="text"
        placeholder="Hobbies Interest"
      ></input>
    </div>
  );
}
export default TagsInput;
