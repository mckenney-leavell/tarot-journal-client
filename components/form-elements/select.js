export function Select({id, options, title, label, onChangeFunc, addlClass = "" }) {
  return (
    <>
      {label ? <label>{label}</label> : <></>}
        <select id={id} onChange={onChangeFunc} className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" required>
          <option defaultValue={undefined}>{title}</option>
          {
            options.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))
          }
        </select>
    </>
  )
}
