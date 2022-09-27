import { createRouter } from "./context";
import { z } from "zod";

export const adminRouter = createRouter()
	.mutation("createEvent", {
		input: z.object({
			eventName: z.string(),
			eventDescription: z.string(),
			eventImage: z.string().optional(),
			eventOrg: z.string(),
			eventStart: z.date(),
			eventEnd: z.date(),
			formOpen: z.date(),
			formClose: z.date(),
		}),
		async resolve({ input, ctx }) {
			let newEvent = await ctx.prisma.events.create({
				data: {
					name: input.eventName,
					description: input.eventDescription,
					headerImage: input.eventImage!,
					organization: input.eventOrg,
					eventStart: input.eventStart,
					eventEnd: input.eventEnd,
					formOpen: input.formOpen,
					formClose: input.formClose,
				},
			});

			return {
				status: "success",
				event: newEvent,
			};
		},
	})
	.query("getAll", {
		async resolve({ ctx }) {
			return "Hello world";
		},
	});