import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3001/test", (req, res, ctx) => {
    return res(
      ctx.json({
        test: true,
      })
    );
  }),
];
