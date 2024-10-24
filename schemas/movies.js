const z = require('zod')

const movieSchema = z.object({
	title: z
		.string({
			invalid_type_error: 'Movie title must be a string',
			required_error: 'Movie title is required',
		})
		.min(1)
		.max(100),
	genre: z.array(
		z.enum([
			'Action',
			'Adventure',
			'Crime',
			'Comedy',
			'Drama',
			'Fantasy',
			'Horror',
			'Thriller',
			'Sci-Fi',
		]),
		{
			invalid_type_error: 'Movie genre must be an array of enum Genre',
			required_error: 'Movie genre is required',
		}
	),
	year: z.number().int().min(1900).max(new Date().getFullYear()),
	director: z.string().min(1).max(100),
	duration: z.number().int().min(1),
	rate: z.number().min(0).max(10).default(5.5),
	poster: z.string().url({
		message: 'Poster must be a valid URL',
	}),
})

function validateMovie(object) {
	return movieSchema.safeParse(object)
}

function validatePartialMovie(object) {
	return movieSchema.partial().safeParse(object)
}

module.exports = {
	validateMovie,
	validatePartialMovie,
}
