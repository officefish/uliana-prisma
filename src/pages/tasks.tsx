import {useSiteStore} from "@/providers/store";
import {Page} from "@/types";
import {FC, useEffect} from "react"

const Tasks: FC = () => {

  const { setPage} = useSiteStore()
  
  useEffect(() => {
      setPage(Page.TASKS)

  }, [setPage])

  // useEffect(() => {
  //   setIsFooterTransparent(false);
  // }, [setIsFooterTransparent]);

  // const { dailyTasks, seasonTasks } = useUserStore()
  // const [currentTask, setCurrentTask] = useState<ITask>(seasonTasks[0])

  // const handleTaskClick = (task: ITask) => {
  //     setCurrentTask(task)
  //     if (task.status === "READY") {
  //       if (task?.templateTask?.type.includes('OKX')) setIsOkxDialogOpen(true)
  //       else setIsReadyDialogOpen(true)
  //     } else if (task.status === "PENDING" || task.status === "IN_PROGRESS") {
  //       if (task?.templateTask?.type.includes('OKX')) setIsOkxDialogOpen(true)
  //       else setIsPendingDialogOpen(true)
  //     }
  // }

  // const navigate = useNavigate();
  // const handleNavigateClick = () => {
  //     const path = currentTask.templateTask.navigate
  //     if (!path) {
  //       setIsPendingDialogOpen(false)
  //       return
  //     }

  //     if (path.startsWith('http://') || path.startsWith('https://')) {
  //       // Если да, открываем ссылку в новой вкладке
  //       setIsPendingDialogOpen(false)
  //       window.open(path, '_blank');
  //     } else {
  //       // В противном случае, используем navigate для перехода внутри приложения
  //       setIsPendingDialogOpen(false)
  //       navigate(path);
  //     }

  // }

  // const handleReadyClick = async () => {
  //     if (!bauntyLoading) {
  //       await getTaskBaunty(currentTask.id)
  //       setIsPendingDialogOpen(false)
  //       setIsReadyDialogOpen(false)
  //       setIsOkxDialogOpen(false)
  //       await updateTasksStatus()
  //     }
  // }

  // const { t } = useTranslation();

    return (
    <div className="w-screen h-screen text-black text-3xl flex items-center justify-center">
      Задания       
    </div>
  )}
export default Tasks
