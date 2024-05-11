import { Detail, useFetch } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [packageName, setPackageName] = useState("");
  const { data, error, isLoading } = useFetch(`https://registry.npmjs.org/${packageName}`, {
    headers: {
      "User-Agent": "Raycast/1.0",
    },
  });

  if (isLoading) {
    return <Detail isLoading={true} />;
  }

  if (error) {
    return <Detail markdown={`Error: ${error.message}`} />;
  }

  if (!data) {
    return <Detail markdown="No data found. Please enter a valid package name." />;
  }

  const { name, version, description, author } = data;
  const markdown = `
# ${name}
- **Latest Version:** ${version}
- **Description:** ${description}
- **Author:** ${author ? author.name : "Unknown"}
`;

  return <Detail markdown={markdown} />;
}
