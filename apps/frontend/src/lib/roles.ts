const roles = [
  { name: 'Proselyte', Pcompleted: 0 },
  { name: 'Proxy', Pcompleted: 25 },
  { name: 'Messenger', Pcompleted: 65 },
  { name: 'Weaver', Pcompleted: 115 },
] as const;

export function getRole(Pcompleted: number) {
  return roles.filter((role) => role.Pcompleted <= Pcompleted).at(-1);
}

export function nextRole(rank: string) {
  return roles[roles.findIndex((role) => role.name === rank) + 1];
}
