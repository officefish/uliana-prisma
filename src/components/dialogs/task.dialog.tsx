import {ChangeEvent, FC, useEffect, useRef, useState,} from 'react'
// import { StyledDialog } from '@/styled/dialog.styled'
import {ITask} from '@/types'
import {TasksProgress} from "@/components/tasks/tasks.progress.tsx";
import {useTranslation} from 'react-i18next';
import {TaskImageMap} from "@/const/task.tsx";
import useRegisterOKXAccount from "@/hooks/api/useRegisterOKXAccount.tsx";
import {apiFetch} from "@/services/api";

import {Okx} from "@/types/okx.tsx";
import {useOKXStore} from "@/providers/okx";

interface PendingTaskDialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onNavigateClick: () => void
  task: ITask
}

function getTaskSrc(type: string): string {
  return TaskImageMap[type] || TaskImageMap["default"];
}

export const PendingTaskDialog: FC<PendingTaskDialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
    onNavigateClick,
    task
  } = props

  function onCancel(): void {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  const { t } = useTranslation();

  if (!task) return <></>

  return (
    <dialog className='modal overflow-hidden' ref={modalRef}>
      <div className='w-full h-screen bottom-0 absolute flex justify-end'>
        <div className='task-modal relative h-screen overflow-y-hidden'>
          <div className='task-modal-close cursor-pointer' onClick={onCancel}>
            <img className='w-8 h-8' src="/tasks/close.svg" alt="close"/>
          </div>

          <div className='task-modal-content w-full flex flex-col justify-center items-center pt-8 pb-5'>
            <div className='flex items-center justify-center w-full p-4'>
              <img
                className='task-modal-content-image w-[200px] h-[200px] rounded-md'
                src={getTaskSrc(task.templateTask.type)} alt=""
              />
            </div>
            <div className='shop-dialog-title mt-4 uppercase'>{t(`${task.templateTask.title}`)}</div>
            <div className='shop-dialog-description mt-3 px-6'>
            {t(`${task.templateTask.description}`)}
            </div>
            <div className="task-baunty flex flex-row items-center justify-center gap-3 mt-4">
              <img className="w-8 h-8" src="/tasks/coin.webp" alt="coin"/>
              <span>+{task.templateTask.baunty}</span>
            </div>
          </div>


          <div className=' w-screen'>
            <div className="mb-4 px-3">
              {!!task?.progress && task?.status === 'InProgress' && (
                <div className="w-full">
                  <TasksProgress value={task?.progress || 1} maxValue={task?.maxProgress || 1}/>
                </div>
              )}
            </div>

            <div
              className='function-btn btn-no-body flex items-center justify-center pt-6'
              onClick={onNavigateClick}
            >
              {t('additional.do_it')}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}

interface ReadyTaskDialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onReadyClick: () => void
  task: ITask
}

export const ReadyTaskDialog: FC<ReadyTaskDialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
    onReadyClick,
    task
  } = props

  function onCancel(): void {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  const { t } = useTranslation();

  if (!task) return <></>

  return (
    <dialog className='modal overflow-hidden' ref={modalRef}>
      <div className='w-full max-h-screen bottom-0 absolute'>
        <div className='task-modal relative mt-[120px] overflow-y-hidden !pb-36'>
          <div className='absolute top-4 right-4 cursor-pointer' onClick={onCancel}>
            <img className='w-6 h-6' src="/tasks/close.svg" alt="close" />
          </div>
          <div className='w-full flex flex-col justify-center items-center pt-8'>
            <div className='flex items-center justify-center w-full p-4'>
              <img className='w-[200px] h-[200px] rounded-md' src={getTaskSrc(task.templateTask.type)} alt=""/>
            </div>
            <div className='shop-dialog-title mt-4 uppercase'>{t(`${task.templateTask.title}`)}</div>
            <div className='shop-dialog-description mt-3 px-6'>
              {t(`${task.templateTask.description}`)}
            </div>
            <div className="task-baunty flex flex-row items-center justify-center gap-3 mt-4">
              <img className="w-8 h-8" src="/tasks/coin.webp" alt="coin"/>
              <span>+{task.templateTask.baunty}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-12 w-screen'>
        <div className='function-btn btn-no-body pt-6 flex items-center justify-center'
             onClick={onReadyClick}
        >{t('additional.get_reward')}
        </div>
      </div>
    </dialog>
  )
}


// OKX
interface OkxTaskDialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  onOkxClick: () => void
  task: ITask
}

export const OkxTaskDialog: FC<OkxTaskDialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null);

  const refCode = 19556891
  const maxCharLength = 16

  const [okxID, setOkxID] = useState<string | undefined>()
  const [okxIsRegistration, setOkxIsRegistration] = useState(false)
  const [okxStatus, setOkxStatus] = useState("")

  const [okxCheckError, setOkxCheckError] = useState(false)
  const [okxCheckSuccess, setOkxCheckSuccess] = useState(false)
  const [okxLoading, setOkxLoading] = useState(false)

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFocus = () => setIsExpanded(true);
  const handleBlur = () => setIsExpanded(false);

  const { isRegistered, isValidated, isDeposited } = useOKXStore();

  const {
    setIsOpen,
    isOpen,
    onOkxClick,
    task
  } = props

  function onCancel(): void {
    setIsOpen(false)
  }

  function checkInput(input: string) {
    // Разрешённые символы: цифры 0-9, буквы A-Z и a-z
    const regex = /^[a-zA-Z0-9]*$/;

    return input.length <= maxCharLength && regex.test(input)
  }

  function inputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (checkInput(value)) setOkxID(value);
  }

  function copyCode() {
    navigator.clipboard.writeText(String(refCode))
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()

    // Убирает баг с автофокусом
    setTimeout(() => inputRef?.current?.blur(), 0)

    setOkxIsRegistration(isRegistered)
  }, [isOpen])

  // На случай ошибок состояний, сверяемся со store
  useEffect(() => {
    if (
      (okxStatus === Okx.register) && isRegistered ||
      (okxStatus === Okx.kyc) && isValidated ||
      (okxStatus === Okx.deposit) && isDeposited
    ) {
      setOkxCheckSuccess(true)
      setOkxCheckError(false)
    }
  }, [isValidated, isDeposited, isRegistered]);

  const {t} = useTranslation();


  // Register
  const onSuccess = (page: Okx) => {
    setOkxStatus(page)
    setOkxCheckError(false)
    setOkxLoading(false)
  }

  const onError = () => {
    setOkxCheckError(true)
    setOkxLoading(false)
  }

  useEffect(() => {
    if (task?.templateTask?.type) setOkxStatus(task.templateTask.type)
  }, [task?.templateTask?.type]);


  const { registerOKXAccount } = useRegisterOKXAccount(apiFetch, () => onSuccess(Okx.kyc), onError)
 
  const handleCheckButton = async () => {
    if (okxLoading) return;

    switch (okxStatus) {
      case Okx.register:
        if (okxID?.length === maxCharLength) {
          setOkxCheckError(false)
          setOkxLoading(true)
          await registerOKXAccount(okxID)
        } else {
          setOkxCheckError(true)
          setOkxLoading(false)
        }
        break
    }
  }

  if (!task) return <></>
  return (
    <dialog className='modal overflow-hidden !absolute' ref={modalRef} autoFocus={false}>
      <div className={`w-full max-h-screen bottom-0 absolute ${isExpanded ? '!h-screen' : ''}`}>
        <div className='task-modal relative !h-[100%] mt-[120px] overflow-y-hidden pb-8'>
          <div className='absolute top-4 right-4 cursor-pointer' onClick={onCancel}>
            <img className='w-6 h-6' src="/tasks/close.svg" alt="close"/>
          </div>

          <div className='w-full flex flex-col justify-center items-center pt-8 pb-8 px-4'>
            <div className='flex items-center justify-center w-full p-4'>
              <img className='w-[200px] h-[200px] rounded-md' src={getTaskSrc(okxStatus)} alt=""/>
            </div>

            {okxStatus === Okx.register && (
              <>
                <div className="flex flex-col items-center gap-4">
                  <div className='shop-dialog-title mt-4 uppercase'>{t(`${task.templateTask.title}`)}</div>

                  <p className="okx-body text-center">1. {t("tasks.okx.register.step_one")}</p>

                  {!okxIsRegistration && (
                    <div className="w-full flex flex-col items-center gap-3">
                      <a
                        href="https://okx.com/join/19556891" target="_blank"
                        className="function-btn btn-no-body flex items-center justify-center w-full max-w-60"
                      >
                        {t("tasks.okx.register.referral_button")}
                      </a>

                      <p className="shop-dialog-description flex gap-1">
                        {t("tasks.okx.register.referral_code")}:
                        <span className="okx-code" onClick={copyCode}>{refCode}</span>
                      </p>
                    </div>
                  )}

                  <p className="okx-body text-center">2. {t("tasks.okx.register.step_two")}</p>

                  <div className="flex flex-col items-center gap-1">
                    <p className="okx-note text-center">1 {t("tasks.okx.register.instruct_one")}</p>
                    <p className="okx-note text-center">2 {t("tasks.okx.register.instruct_two")}</p>
                    <p className="okx-note text-center">3 {t("tasks.okx.register.instruct_three")}</p>
                  </div>
                </div>

                <div className="task-baunty flex flex-row items-center justify-center gap-3 mt-4">
                  <img className="w-8 h-8" src="/tasks/coin.webp" alt="coin"/>
                  <span>+{task.templateTask.baunty}</span>
                </div>

                <div className="w-full flex flex-col items-start justify-center gap-2.5 mt-2">
                  <label className="okx-title">{t("tasks.okx.register.you_uid")}</label>
                  <input className={`w-full input-primary input input-xl ${okxCheckError ? 'input-error' : ''}`}
                         ref={inputRef}
                         type="text"
                         placeholder={t("tasks.okx.register.type_you_uid")}
                         onChange={inputChange}
                         value={okxID}
                         onFocus={handleFocus}
                         onBlur={handleBlur}
                  />
                  {okxCheckError && (<p className="okx-error">{t("tasks.okx.register.input_invalid_id")}</p>)}
                </div>
              </>
            )}

            {okxStatus === Okx.kyc && (
              <>
                <div className="flex flex-col items-center">
                  <div className='shop-dialog-title mt-4 uppercase'>{t(`${task.templateTask.title}`)}</div>

                  <p className="shop-dialog-description mt-4 mb-1">{t("tasks.okx.verify.subtitle")}</p>

                  <div className="flex flex-col items-center gap-1">
                    <p className="okx-body text-center">1. {t("tasks.okx.verify.step_one")}</p>
                    <p className="okx-body text-center">2. {t("tasks.okx.verify.step_two")}</p>
                    <p className="okx-body text-center">3. {t("tasks.okx.verify.step_three")}</p>
                    <p className="okx-body text-center">4. {t("tasks.okx.verify.step_four")}</p>
                  </div>
                </div>

                <div className="task-baunty flex flex-row items-center justify-center gap-3 mt-4">
                  <img className="w-8 h-8" src="/tasks/coin.webp" alt="coin"/>
                  <span>+{task.templateTask.baunty}</span>
                </div>

                {okxCheckError && (<p className="text-center okx-error mt-4">{t("tasks.okx.verify.check_error")}</p>)}
              </>
            )}

            {okxStatus === Okx.deposit && (
              <>
                <div className="flex flex-col items-center gap-4">
                  <div className='shop-dialog-title mt-4 uppercase'>{t(`${task.templateTask.title}`)}</div>

                  <div className='shop-dialog-description mt-3 px-6'>
                    {t(`tasks.okx.deposit.subtitle`)}
                  </div>
                </div>

                <div className="task-baunty flex flex-row items-center justify-center gap-3 mt-4">
                  <img className="w-8 h-8" src="/tasks/coin.webp" alt="coin"/>
                  <span>+{task.templateTask.baunty}</span>
                </div>

                {okxCheckError && (<p className="text-center okx-error mt-4">{t("tasks.okx.deposit.check_error")}</p>)}
              </>
            )}
          </div>


          <div className='w-screen'>
            {/*TODO: Подключить кнопки*/}

            {okxCheckSuccess ? (
                <div className='function-btn btn-no-body flex items-center justify-center pt-6 uppercase'
                     onClick={onOkxClick}>{t('tasks.okx.claim_reward')}</div>
            ) : (
              <div className='function-btn btn-no-body flex items-center justify-center pt-6 uppercase'
                   onClick={handleCheckButton}>{t("tasks.check")}</div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  )
}
