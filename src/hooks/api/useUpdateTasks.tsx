import {useCallback} from 'react';
import {useSnackbar} from 'notistack'; // Assuming you're using notistack for notifications
import {ITask, Page} from '@/types';
import {useUserStore} from '@/providers/user';
import {useSiteStore} from "@/providers/store";

const useUpdateTasks = (apiFetch: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { setDailyTasks, setSeasonTasks } = useUserStore();
  const { pageNotifications, setPageNotifications } = useSiteStore()

  const updateTasks = useCallback(
    async () => {
      try {
        const res = await apiFetch('/tasks', 'POST', {}, enqueueSnackbar);

        // Filter tasks into dailyTasks and seasonTasks
        const dailyTasks = res.filter((task: ITask) => task.templateTask.isDaily);
        const seasonTasks = res.filter((task: ITask) => !task.templateTask.isDaily);

        const isClaimTask = !![...dailyTasks, ...seasonTasks].find((task) => task?.status === "READY")
        if (isClaimTask) setPageNotifications([...pageNotifications, Page.TASKS])

        // console.log('Daily Tasks:', dailyTasks);
        // console.log('Season Tasks:', seasonTasks);

        setDailyTasks(dailyTasks);
        setSeasonTasks(seasonTasks);

        //console.log(res);
      } catch (error) {
        console.error('Error updating user tasks:', error);
        enqueueSnackbar('Error updating tasks', { variant: 'error' });
      }
    },
    [apiFetch, enqueueSnackbar, setDailyTasks, setSeasonTasks] // Dependencies
  );

  return { updateTasks };
};

export default useUpdateTasks;


// const useUpdateTasks = (apiFetch: any, showLoading: any, hideLoading: any) => {
//   const { enqueueSnackbar } = useSnackbar();

//   const updateTasks = useCallback(
//     async () => {
//       try {
//         showLoading(); // Show loading state
//         const res = await apiFetch('/mission/getMissions', 'GET', null, enqueueSnackbar);
//         console.log(res);
//         if (res.status === true) {
//           console.log('Tasks from server received');
//           //const missions = res.data.missions;
//           //setAllTasks(missions);
//         }
//       } catch (error) {
//         console.error('Error updating user tasks:', error);
//         enqueueSnackbar('Error updating tasks', { variant: 'error' });
//       } finally {
//         hideLoading(); // Hide loading state
//       }
//       return null;
//     },
//     [apiFetch, enqueueSnackbar, showLoading, hideLoading] // Dependencies
//   );

//   return { updateTasks };
// };

// export default useUpdateTasks;
