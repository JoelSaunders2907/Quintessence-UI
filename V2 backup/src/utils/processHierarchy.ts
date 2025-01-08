import { ProcessNode } from '../types/process';

export function getAllChildProcesses(node: ProcessNode): string[] {
  const processes: string[] = [];
  
  Object.entries(node).forEach(([process, [_, children]]) => {
    processes.push(process);
    processes.push(...getAllChildProcesses(children));
  });
  
  return processes;
}

export function toggleProcessWithChildren(
  process: string,
  node: ProcessNode,
  currentSelected: string[]
): string[] {
  // Find all child processes
  const children = findProcessChildren(process, node);
  
  // If process is currently selected, remove it and all children
  if (currentSelected.includes(process)) {
    return currentSelected.filter(p => p !== process && !children.includes(p));
  }
  
  // If process is not selected, add it and all children
  return [...currentSelected, process, ...children];
}

function findProcessChildren(process: string, node: ProcessNode): string[] {
  for (const [nodeName, [_, children]] of Object.entries(node)) {
    if (nodeName === process) {
      return getAllChildProcesses(children);
    }
    const foundInChildren = findProcessChildren(process, children);
    if (foundInChildren.length > 0) {
      return foundInChildren;
    }
  }
  return [];
}