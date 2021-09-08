import request from "supertest";
import mainServerApp from "../../../src/server/server";
import constants from "../../../constants/constants";
//git commit -m "testing, context, hot loading, styling (with libraries), server, linting,
const { LOCAL_HOST, SERVER_PORT } = constants;
const srvPortModified = parseInt(SERVER_PORT); //+ 1000;
const serverString = LOCAL_HOST + srvPortModified;

// console.log(mainServerApp);
// mainServerApp.close();
mainServerApp.listen(srvPortModified, () => {
  console.log("TEST SERVER listening on port:", srvPortModified);
});

global.testServer = mainServerApp;
console.log(global.testServer);

/**
 * Server must be up and running in order for this test suite to run
 */

describe("test route", () => {
  it("responds with 200 status and json {test: true}", async () => {
    return await request(serverString)
      .get("/test")
      .expect((res) => {
        return res.body === { test: true };
      })
      .expect(200);
  });
});
