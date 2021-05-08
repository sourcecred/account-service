// functions/mergeAccounts.js
import sc from "sourcecred";

exports.handler = async (event) => {
  const repo = event.queryStringParameters.repo || "sourcecred/cred";

  const instance = sc.sourcecred.instance.readInstance.getNetworkReadInstance(
    `https://raw.githubusercontent.com/${repo}/gh-pages/`
  );
  const timestamp = (await instance.readCredGraph())
    .intervals()
    .reduce((_, v) => v.endTimeMs);
  const subject = event.queryStringParameters.name || "World";
  return {
    statusCode: 200,
    body: `
Hello ${subject}!\n
The last interval ended on ${new Date(timestamp)} \
for the ${repo} cred instance.
    `,
  };
};
