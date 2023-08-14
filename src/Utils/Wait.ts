const Wait = (delay: number) =>
	new Promise(resolve => setTimeout(resolve, delay))

export default Wait
