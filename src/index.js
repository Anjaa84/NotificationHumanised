const notificationTemplate = require("./adaptiveCards/notification-default.json");
const { notificationApp } = require("./internal/initialize");
const { AdaptiveCards } = require("@microsoft/adaptivecards-tools");
const { TeamsBot } = require("./teamsBot");
const restify = require("restify");
const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");

// Create HTTP server.
const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\nApp Started, ${server.name} listening to ${server.url}`);
});

function authenticateToken(req, res, next) {
  // Assuming the authentication token is provided in the request headers
  const token = req.headers.authorization;

  // Your authentication logic here to decode and validate the token
  // For demonstration, let's assume it's a JWT token and we decode it

  const accessToken =
    "eyJ0eXAiOiJKV1QiLCJub25jZSI6InktVFpMTGNrckc1MmdTRTdjZWZPbVBvS0RUMVA2X3Q5dmotVWNEX0ltbTgiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyIsImtpZCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81OGNjZDU3Yy02NDk1LTRiYzgtODQyYS1jMTgxODg1Y2VhMmIvIiwiaWF0IjoxNzA4NTAwNTIwLCJuYmYiOjE3MDg1MDA1MjAsImV4cCI6MTcwODUwNDczOSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhWQUFBQXN4YWZMaUFHb1dIb0o2Y0ZWTlFJajBXKy8wV0FuVEJXN25TOXFlUUZqTW9wQjdCeEh3enNJUHBCa1gxRWpGak4iLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6Imh1bWFuaXNlZCIsImFwcGlkIjoiNjQ1Y2E4ZDgtMzcwMS00NTIwLWEzMTItYzE3ZjQ3MTk5ODZiIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJNYW5pa2F2YXNhZ2FyIiwiZ2l2ZW5fbmFtZSI6IkFuamFuYW4iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxMTIuMTM0LjIxMy4yMTUiLCJuYW1lIjoiQW5qYW5hbiBNYW5pa2F2YXNhZ2FyIiwib2lkIjoiMDFlZGFlMjgtZGQ4MS00ODVhLWFlOWQtZTI2MTMwMDUyOTgzIiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMyMDAyNkUwODUxNTUiLCJyaCI6IjAuQVhFQWZOWE1XSlZreUV1RUtzR0JpRnpxS3dNQUFBQUFBQUFBd0FBQUFBQUFBQUNIQU5vLiIsInNjcCI6Im9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZCBlbWFpbCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Ik5OeFl2QnNla0F3MlpBMFZ1X0pnS2ladG5VZjBLZWl3SmZTa2JWaHB6QTAiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiQVMiLCJ0aWQiOiI1OGNjZDU3Yy02NDk1LTRiYzgtODQyYS1jMTgxODg1Y2VhMmIiLCJ1bmlxdWVfbmFtZSI6IkFuamFuYW5AYmV0YWxhdW5jaC5pbyIsInVwbiI6IkFuamFuYW5AYmV0YWxhdW5jaC5pbyIsInV0aSI6IjU2OHBoZThfd1VpVXVrSV81T1VtQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfc3QiOnsic3ViIjoid2c5bWp1UUd3eEhULXRBWVJVNGphNkNmWFZpZV9nS2xmSU5OSEhNR1lWRSJ9LCJ4bXNfdGNkdCI6MTY0NjMwNDk0N30.XupW7NWIIaP0pHmEPSJvexwTYIojTXjNO0gQVNeMex6AH7Om_DQp5G6OeWLOjZGUhARw4Q9Jf-4wswGm5O9sdcvTzHAB4v0VKMXE1LRAz3EC-3EK-3ctnqp8pGDU7hIRJf3zlnqQ-c0UA_AkTtdacMqMm-Wv_gCl72Ytf7LZ3vYJYT2XdT6ouQvzcTdxWWfb2xyouWQjU0IhN4aVg-nWdhdIsB_d-l4aptGTWJTHj0i8ShiJFux5q7Mxb005J85Yl7KtK8xCWwwSCSespOUoiBozzGW6NakfQylyhHTyzyBtYa0WZp9h174n5a_SGmYgJMqEIfCJ8-RoWwiFzQT9kQ";
  const decodedToken = decodeJWTToken(accessToken);
  console.log("decodedToken::: thala ", decodedToken);

  // Attach user information from the token to the request object for later use

  // req.user = decodedToken.user;

  next();
}

function decodeJWTToken(token) {
  // Your logic to decode the JWT token and extract user information
  // For demonstration, let's assume you're using a library like jsonwebtoken
  // const decoded = jwt.verify(token, "6d3c8342-e230-4316-aa35-30d394b1544d", {
  //   algorithms: ["RS256"],
  // });

  // Assuming the decoded token contains user information
  return decoded;
}

// HTTP trigger to send notification. You need to add authentication / authorization for this API. Refer https://aka.ms/teamsfx-notification for more details.

server.post(
  "/api/notification",
  restify.plugins.queryParser(),
  restify.plugins.bodyParser(), // Add more parsers if needed

  async (req, res) => {
    const pageSize = 100;

    const teams =
      "https://teams.microsoft.com/l/channel/19%3ab7ce2006170740ada63d8264749cb43d%40thread.tacv2/Leave%2520attendance%2520humanized?groupId=b21eba14-2733-4976-9e8e-9e046a9c340e&tenantId=58ccd57c-6495-4bc8-842a-c181885cea2b";

    // const channelId = req.body.channelId;

    let continuationToken = undefined;
    do {
      const pagedData =
        await notificationApp.notification.getPagedInstallations(
          pageSize,
          continuationToken
        );

      // const teamsChannel = await notificationApp.

      const installations = pagedData.data;
      continuationToken = pagedData.continuationToken;

      // const target = await notificationApp.notification.findChannel(channelId);

      await installations[1].sendAdaptiveCard(req.body.attachments[0].content);

      for (const target of installations) {
        // await target.sendAdaptiveCard(
        //   AdaptiveCards.declare(notificationTemplate).render({
        //     title: "New Event Occurred!",
        //     appName: `${req.body}`,
        //     description: `This is a sample http-triggered notification to ${target.type}`,
        //     notificationUrl: "https://aka.ms/teamsfx-notification-new",
        //   })
        // );

        await target.sendAdaptiveCard(req.body.attachments[0].content);

        /****** To distinguish different target types ******/
        /** "Channel" means this bot is installed to a Team (default to notify General channel)
        if (target.type === NotificationTargetType.Channel) {
          // Directly notify the Team (to the default General channel)
          await target.sendAdaptiveCard(...);

          // List all channels in the Team then notify each channel
          const channels = await target.channels();
          for (const channel of channels) {
            await channel.sendAdaptiveCard(...);
          }

          // List all members in the Team then notify each member
          const pageSize = 100;
          let continuationToken = undefined;
          do {
            const pagedData = await target.getPagedMembers(pageSize, continuationToken);
            const members = pagedData.data;
            continuationToken = pagedData.continuationToken;

            for (const member of members) {
              await member.sendAdaptiveCard(...);
            }
          } while (continuationToken);
        }
        **/

        /** "Group" means this bot is installed to a Group Chat
        if (target.type === NotificationTargetType.Group) {
          // Directly notify the Group Chat
          await target.sendAdaptiveCard(...);

          // List all members in the Group Chat then notify each member
          const pageSize = 100;
          let continuationToken = undefined;
          do {
            const pagedData = await target.getPagedMembers(pageSize, continuationToken);
            const members = pagedData.data;
            continuationToken = pagedData.continuationToken;

            for (const member of members) {
              await member.sendAdaptiveCard(...);
            }
          } while (continuationToken);
        }
        **/

        /** "Person" means this bot is installed as a Personal app
        if (target.type === NotificationTargetType.Person) {
          // Directly notify the individual person
          await target.sendAdaptiveCard(...);
        }
        **/
      }
    } while (continuationToken);

    /** You can also find someone and notify the individual person
    const member = await notificationApp.notification.findMember(
      async (m) => m.account.email === "someone@contoso.com"
    );
    await member?.sendAdaptiveCard(...);
    **/

    /** Or find multiple people and notify them
    const members = await notificationApp.notification.findAllMembers(
      async (m) => m.account.email?.startsWith("test")
    );
    for (const member of members) {
      await member.sendAdaptiveCard(...);
    }
    **/

    res.json({});
  }
);

// Bot Framework message handler.
const teamsBot = new TeamsBot();
server.post("/api/messages", async (req, res) => {
  await notificationApp.requestHandler(req, res, async (context) => {
    await teamsBot.run(context);
  });
});
