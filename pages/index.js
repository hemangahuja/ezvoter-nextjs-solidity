import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {ethers} from 'ethers'
import { useState, useEffect } from 'react'
import contractAbi from '../public/abi.json'
export default function Home() {
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [text, setText] = useState('');
    const [winner, setWinner] = useState('No winner yet');
    const [noOfCandidates, setNoOfCandidates] = useState('');
    const contractAddress = "0x929e9f5556B8404f1EB3b0C291a83386297C88C4";

    useEffect(async () => {
          connectWallet();
          connectContract();
    }
    , []);
    const connectWallet = async () => {
      if(window.ethereum){
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
      })
      setAccount(accounts[0]);
      setText(`Your address is ${accounts[0]}`);
      return accounts[0];
    }
    else{
      setText('Please connect to MetaMask');
      return null;
    }
  }
  const connectContract = async () => {
    const myProvider = new ethers.providers.Web3Provider(window.ethereum , "any");
    const mySigner = myProvider.getSigner();
    const myContract = new ethers.Contract(
     contractAddress,
      contractAbi,
      mySigner
    );
    setProvider(myProvider);
    setSigner(mySigner);
    setContract(myContract);
  }
  const addCandidate = async (candidateAddress) => {
    const tx = await contract.addCandidate(candidateAddress);
    console.log(tx);
  }
  const getNoOfCandidates = async () => {
    const response = await contract.getLength();
    setNoOfCandidates(response.toString());
   
  }
  const voteForCandidate = async (candidateAddress) => {
    const tx = await contract.voteForCandidate(candidateAddress);
    console.log(tx);
  }
  const getWinner = async () => {
    const response = await contract.getWinner();
    setWinner(response + ' is the winner');
    console.log(response);
  }
    return (
        <div className={styles.container}>
            <Head>
                <title>EZVoter</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
              {text}
            </div>
            <input id = "Addcandidate" type = "text"></input>
            <button onClick = {() => addCandidate(document.getElementById('Addcandidate').value)}>Add Candidate</button>
            <button onClick = {() => getNoOfCandidates()}>Get No of Candidates</button>
            <div>{noOfCandidates}</div>
            <input id = "Votecandidate" type = "text"></input>
            <button onClick = {() => voteForCandidate(document.getElementById('Votecandidate').value)}>Vote for Candidate</button>
            <button onClick = {() => getWinner()}>Get Winner</button>
            <div>{winner}</div>
        </div>
    )
}
