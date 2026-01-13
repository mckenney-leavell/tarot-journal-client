export function Textarea({id, label, placeholder, refEl}) {
  return (
    <div className="field text-lg">
      <label className="label">{label}</label>
      <div className="control">
        <textarea id={id} className="textarea block w-full rounded-md px-3 py-1.5 bg-(--clr-surface-tonal-a10) border border-(--clr-surface-tonal-a30) placeholder:text-(--clr-surface-tonal-a50) focus:outline-2 focus:-outline-offset-1 focus:outline-(--clr-primary-a30)" ref={refEl} placeholder={placeholder}></textarea>
      </div>
    </div>
  )
}
