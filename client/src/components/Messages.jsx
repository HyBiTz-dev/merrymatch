export default function Messages({ messages, user, profile }) {
  return (
    <div className="flex flex-col w-full px-14">
      {messages.sender_id === user ? (
        <ul className="flex flex-col w-full">
          <li className="bg-purple-600 px-6 py-4 text-body2 text-white rounded-l-3xl rounded-tr-3xl self-end">
            {messages.message_text.match(/\.(jpeg|jpg|webp|png)$/) != null ? (
              <img src={messages.message_text} className="h-60 h-60" />
            ) : (
              messages.message_text
            )}
          </li>
        </ul>
      ) : (
        <ul className="flex items-end w-full gap-3">
          <img
            src={profile}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <li className="bg-purple-200 border border-gray-200 px-6 py-4 text-body2 text-black rounded-r-3xl rounded-tl-3xl">
            {messages.message_text.match(/\.(jpeg|jpg|webp|png)$/) != null ? (
              <img src={messages.message_text} className="h-60 h-60" />
            ) : (
              messages.message_text
            )}
          </li>
        </ul>
      )}
    </div>
  );
}
