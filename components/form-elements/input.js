export function Input({
	id,
	type = "text",
	placeholder = "",
	refEl = undefined,
	label = undefined,
	onChangeEvent,
	addlClass = "",
	children
}) {
	return (
		<div className="text-lg">
			{label && <label>{label}</label>}
			<div>
				<input
					id={id}
					placeholder={placeholder}
					className="block w-full rounded-md bg-(--clr-surface-tonal-a10) px-3 py-1.5 border border-(--clr-surface-tonal-a30) placeholder:text-(--clr-surface-tonal-a50) focus:outline-2 focus:-outline-offset-1 focus:outline-(--clr-primary-a30)"
					type={type}
					ref={refEl}
					onChange={onChangeEvent}>
				</input>
			</div>
			{children}
		</div>
	)
}