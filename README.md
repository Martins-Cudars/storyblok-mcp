# Storyblok MCP Server

A Model Context Protocol (MCP) server that connects to your Storyblok space, allowing AI assistants like Claude and Google Antigravity to fetch stories and components directly.

## Features

-   **`get-stories`**: Fetches all stories from your Storyblok space.
-   **`get-components`**: Fetches all components (blocks) and their schemas from your Storyblok space.
-   **`ping`**: Simple health check tool.

## Prerequisites

-   Node.js (v18 or higher)
-   pnpm (recommended) or npm

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd storyblok-mcp
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

## Configuration

1.  Copy the example environment file:
    ```bash
    cp .env.example .env
    ```

2.  Open `.env` and add your Storyblok credentials:
    ```env
    STORYBLOK_SPACE_ID=your_space_id_here
    STORYBLOK_MANAGEMENT_TOKEN=your_management_token_here
    ```
    -   **Space ID**: Found in your Storyblok space URL or settings.
    -   **Management Token**: Generate one in your Storyblok Account Settings > Personal Access Tokens.

## Building

Build the project to generate the JavaScript output:

```bash
pnpm run build
```

## Usage

### Google Antigravity

Add the server to your Antigravity configuration file (usually `~/.gemini/antigravity/mcp_config.json`):

```json
{
  "mcpServers": {
    "storyblok-mcp": {
      "command": "node",
      "args": [
        "/absolute/path/to/storyblok-mcp/build/index.js"
      ]
    }
  }
}
```

### Claude Desktop

Add the server to your Claude Desktop configuration:

-   **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "storyblok-mcp": {
      "command": "node",
      "args": [
        "/absolute/path/to/storyblok-mcp/build/index.js"
      ]
    }
  }
}
```

**Note**: Always use the **absolute path** to the `build/index.js` file.

## Development

-   **Build**: `pnpm run build`
-   **Watch mode**: `pnpm run dev`
