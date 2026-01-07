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
		<div>
			{label && <label>{label}</label>}
			<div className="control">
				<input
					id={id}
					placeholder={placeholder}
					className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
					type={type}
					ref={refEl}
					onChange={onChangeEvent}>
				</input>
			</div>
			{children}
		</div>
	)
}