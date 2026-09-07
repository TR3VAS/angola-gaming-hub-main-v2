import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/jogos/")({
  beforeLoad: () => {
    throw redirect({ to: "/games" });
  },
});
