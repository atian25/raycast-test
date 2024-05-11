import { Detail, useFetch } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [packageName, setPackageName] = useState("");
  const { data, error, isLoading } = useFetch(`https://registry.npmjs.org/${packageName}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (error) return <Detail markdown="## Error fetching package info" />;
  if (isLoading) return <Detail markdown="## Loading..." />;

  const packageInfo = data ? (
    <Detail
      markdown={`
# ${data.name}
- **Latest Version:** ${data["dist-tags"].latest}
- **Description:** ${data.description}
- **Author:** ${data.author ? data.author.name : "N/A"}
`}
    />
  ) : (
    <Detail markdown="## Please enter a package name" />
  );

  return packageInfo;
}
