const write = async (newClip: string) => {
  const result = await navigator.permissions.query({
    name: "clipboard-write" as PermissionName,
  });

  if (result.state == "granted" || result.state == "prompt") {
    navigator.clipboard.writeText(newClip);
  }
};

export const useClipboard = () => {
  return {
    write,
  };
};
