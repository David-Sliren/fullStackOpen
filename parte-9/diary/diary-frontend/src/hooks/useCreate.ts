import { useMutation } from "@tanstack/react-query";
import { createDiaries } from "../services";
import { useNotification } from "../store/Notification";

export const useCreateDiarie = () => {
  const { updateNotification } = useNotification();
  const createDiarie = useMutation({
    mutationFn: createDiaries,
    mutationKey: ["newDairie"],
    onSuccess: () => updateNotification("you created a new note for diary"),
    onError: (e) => updateNotification(`failed: ${e}`),
  });

  return { createDiarie };
};
