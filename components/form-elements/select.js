export function Select({id, options, title, label, onChangeFunc, addlClass = "" }) {
  return (
    <div className="text-lg">
      {label ? <label>{label}</label> : <></>}
        <select id={id} onChange={onChangeFunc} className="block w-full rounded-md bg-(--clr-surface-tonal-a10) px-2.5 py-1.5 border border-(--clr-surface-tonal-a30) focus:outline-2 focus:-outline-offset-2 focus:outline-(--clr-primary-a30) border border-(--clr-surface-tonal-a30)" required>
          <option defaultValue={undefined} className="text-(--clr-surface-tonal-a50)">{title}</option>
          {
            options.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))
          }
        </select>
    </div>
  )
}
