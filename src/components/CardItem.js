
const CardItem = ({ item }) => {
  if (item.cmd == 'onChat') {
    return (
      <li className="p-4 bg-slate-100 rounded relative">
        <div className=" absolute bottom-1 right-3">
          <span className="text-xs text-slate-900">{item.msgId}</span>
        </div>
        <h2 className="text-slate-900">{item.userName}</h2>
        <p className="text-slate-900">{item.msg}</p>
      </li>
    )
  }
  else if (item.cmd == 'onAdd') {
    return (
      <li className="p-4 bg-slate-100 rounded relative">
        <div className=" absolute bottom-1 right-3">
          <span className="text-xs text-slate-900">{item.msgId}</span>
        </div>
        <h2 className="text-slate-900">参加しました: {item.userName}</h2>
      </li>
    )
  }
}

export default CardItem;