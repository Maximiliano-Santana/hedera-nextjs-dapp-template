'use client'

import { useWalletState } from "@/services/walletState";
import Button from "../ui/buttons/Button";
import { useEffect } from "react";

export default function ConnectWalletButton(){
    const { isConnected, accountId, connect, disconnect } = useWalletState();

    const toggleConnectWallet = ()=>{
        if(!isConnected){
            connect('0.0.111111');
        }else{
            disconnect();
        }
    }

    useEffect(()=>{
        console.log(isConnected);
    }, [isConnected])

    return <>
        <Button onClick={toggleConnectWallet}>
            {isConnected ? accountId : 'Connect Wallet'}
        </Button>
    </>
}