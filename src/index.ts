import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create the MCP server
const server = new McpServer({
  name: "skeleton-manager",
  version: "1.0.0",
});

import "dotenv/config";

const STORYBLOK_SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const STORYBLOK_MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;

if (!STORYBLOK_SPACE_ID || !STORYBLOK_MANAGEMENT_TOKEN) {
  console.error("Please provide STORYBLOK_SPACE_ID and STORYBLOK_MANAGEMENT_TOKEN in .env file");
  process.exit(1);
}

server.registerTool(
  "ping",
  {
    description: "Ping the skeleton server to check if it is running",
    inputSchema: z.object({
      message: z.string().describe("Your Message"),
    }),
  },
  async ({ message }) => {
    try {
      return {
        content: [
          { type: "text", text: `Server was pinged with the following message => ${message}` },
        ],
      };
    } catch (error) {
      console.error("Error in ping tool:", error);
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
      };
    }
  }
);

server.registerTool(
  "get-stories",
  {
    description: "Fetches stories from Storyblok",
    inputSchema: z.object({}),
  },
  async () => {
    try {
      const response = await fetch(
        `https://mapi.storyblok.com/v1/spaces/${STORYBLOK_SPACE_ID}/stories/`,
        {
          headers: {
            Authorization: `${STORYBLOK_MANAGEMENT_TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch stories: ${response.statusText}`);
      }
      const data = await response.json();
      return {
        content: [
          { type: "text", text: JSON.stringify(data, null, 2) },
        ],
      };
    } catch (error) {
      console.error("Error in get-stories tool:", error);
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
      };
    }
  }
);

server.registerTool(
  "get-components",
  {
    description: "Fetches components from Storyblok",
    inputSchema: z.object({}),
  },
  async () => {
    try {
      const response = await fetch(
        `https://mapi.storyblok.com/v1/spaces/${STORYBLOK_SPACE_ID}/components/`,
        {
          headers: {
            Authorization: `${STORYBLOK_MANAGEMENT_TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch components: ${response.statusText}`);
      }
      const data = await response.json();
      return {
        content: [
          { type: "text", text: JSON.stringify(data, null, 2) },
        ],
      };
    } catch (error) {
      console.error("Error in get-components tool:", error);
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
      };
    }
  }
);

async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP server is running");
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

main();
