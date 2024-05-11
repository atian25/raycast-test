import { Detail, useFetch, ActionPanel, Action, Form, showToast, ToastStyle } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [packageName, setPackageName] = useState("");
  const { data, error, isLoading } = useFetch(`https://registry.npmjs.org/${packageName}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    keepalive: true,
  }, [packageName]);

  if (error) {
    showToast(ToastStyle.Failure, "Failed to fetch package info", error.toString());
    return <Detail markdown="## Error fetching package info" />;
  }
  if (isLoading) return <Detail markdown="## Loading..." />;

  const packageInfo = data ? (
    <Detail
      markdown={`
# ${data.name}
- **Latest Version:** ${data["dist-tags"].latest}
- **Description:** ${data.description}
- **Author:** ${data.author ? data.author.name : "N/A"}
- **License:** ${data.license ? data.license : "N/A"}
- **Homepage:** [${data.homepage}](${data.homepage})
`}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={`https://www.npmjs.com/package/${packageName}`} />
        </ActionPanel>
      }
    />
  ) : (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Fetch Package Info" onSubmit={(values) => setPackageName(values.packageName)} />
        </ActionPanel>
      }>
      <Form.TextField id="packageName" title="Package Name" placeholder="Enter NPM package name" />
    </Form>
  );

  return packageInfo;
}
