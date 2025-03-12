'use client'

import Button from "@/components/ui/buttons/Button"
import { WalletInterface } from "@/services/wallets/WalletInterface";
import { useWalletState } from "@/services/wallets/walletState";
import { Hbar, TransferTransaction } from "@hashgraph/sdk";
import { useEffect, useState } from "react"

export default function TransferForm(){
    const [receiver, setReceiver] = useState<string>('');
    const [amount, setAmount] = useState<number>(0)
    const { isConnected } = useWalletState();
    
    const transferHbar = async()=>{
        if(!isConnected){
            return alert("First connect your wallet")
        }

        const wallet = await WalletInterface.useWallet();

        const tx: TransferTransaction = new TransferTransaction()
            .addHbarTransfer(wallet.getAccountId(), new Hbar(-amount))
            .addHbarTransfer(receiver, new Hbar(amount))
            
        const txId: string | null = await wallet.signTransaction(tx);
        console.log(txId);

        if(txId){
            alert("Tranfer completed: " + txId)
        }


    }

    useEffect(()=>{
    }, [])
    
    return <>
        <form className="border-1 rounded-2xl flex flex-col p-4 gap-4">
            <div className="flex flex-col">
                <label>Receiver</label>
                <input type="text" className="border-1 px-2 py-1" placeholder="0.0.4186010" onChange={(e)=>{setReceiver(e.target.value)}}/>
            </div>
            <div className="flex flex-col">
                <label>Amount</label>
                <input type="number" className="border-1 px-2 py-1" placeholder="100,000" onChange={(e)=>{setAmount(Number(e.target.value))}}/>
            </div>
            
            <Button onClick={transferHbar}>
                Send HBAR
            </Button>
 
        </form>
    </>
}