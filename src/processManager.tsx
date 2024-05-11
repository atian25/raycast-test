import { List, ActionPanel, Action, showToast, ToastStyle, Detail } from "@raycast/api";
import { useState } from "react";

// Mock data for processes, to be replaced with actual system process data retrieval
const mockProcesses = [
  { id: 1, name: "Process 1", cpu: "2%", memory: "50MB" },
  { id: 2, name: "Process 2", cpu: "4%", memory: "150MB" },
  { id: 3, name: "Process 3", cpu: "1%", memory: "30MB" },
];

export default function ProcessManager() {
  const [processes, setProcesses] = useState(mockProcesses);

  const killProcess = async (processId: number) => {
    // Mock process kill action, to be replaced with actual process kill logic
    showToast(ToastStyle.Success, "Process killed", `Process ID: ${processId}`);
    setProcesses(processes.filter((process) => process.id !== processId));
  };

  return (
    <List isLoading={processes.length === 0} searchBarPlaceholder="Filter processes by name...">
      {processes.map((process) => (
        <List.Item
          key={process.id}
          title={process.name}
          subtitle={`CPU: ${process.cpu}, Memory: ${process.memory}`}
          actions={
            <ActionPanel>
              <Action title="Kill Process" onAction={() => killProcess(process.id)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
