import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {ethers} from 'ethers'
import { useState, useEffect } from 'react'
import contractAbi from '../public/abi.json'
 import longErrorToShortError from '../helpers/ErrorHandling'
export default function Home() {
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [text, setText] = useState('');
    const [winner, setWinner] = useState('No winner yet');
    const [noOfCandidates, setNoOfCandidates] = useState('');
    const [candidates, setCandidates] = useState([]);
    const contractAddress = "0x7Fc0C699ab6F90980888DF23045B6EC5c4c681bB";

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
  
  const isAddressValid = (address) => {
    try{
      ethers.utils.getAddress(address);
      return true;
    }
    catch(error){
      return false;
    }
  }
  const addCandidate = async (candidateAddress) => {
    if(!isAddressValid(candidateAddress)){
      setText('Invalid address');
      return;
    }
    try{
      const tx = await contract.addCandidate(candidateAddress);
    console.log(tx);
    }
    catch(error){
      setText(longErrorToShortError(error));
    }
  }
  const getNoOfCandidates = async () => {
    try{
      const response = await contract.getLength();
    setNoOfCandidates(response.toString());
    }
    catch(error){
      setText(longErrorToShortError(error));
    }
   
  }
  const getCandidates = async () => {
    setCandidates([]);
    getNoOfCandidates();
    if(noOfCandidates === '0'){
      setText('No candidates yet');
      return;
    }
    try{
      for(let i=0; i<noOfCandidates; i++){
        const response = await contract.getCandidate(i);
        setCandidates(candidates.concat(response.toString()));
      }
    }
    catch(error){
      setText(longErrorToShortError(error));
    }
  }
  const voteForCandidate = async (candidateAddress) => {
    if(!isAddressValid(candidateAddress)){
      setText('Invalid address');
      return;
    }
    try{
      const tx = await contract.voteForCandidate(candidateAddress);
    console.log(tx);
    }
    catch(error){
      setText(longErrorToShortError(error));
    }
  }
  const calculateWinner = async () => {
    try{
      const response = await contract.calculateWinner();
       console.log(response);
    }
    catch(error){
      setText(longErrorToShortError(error));
    }
  }
  const getWinner = async () => {
   try{
    const response = await contract.getWinner();
    setWinner(response + ' is the winner');
    console.log(response);
   }
    catch(error){
      console.log(error.message);
      setText(longErrorToShortError(error));
    }
  }
  const reset = async () => {
    try{
    const tx = await contract.reset();
    console.log(tx);
    }
    catch(error){
      setText(longErrorToShortError(error));
    }
  }
    return (
        <div className={styles.container}>
            <Head>
                <title>EZVoter</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
              {account && <h3>{account}</h3> }
            </div>
            <div>
              {text}
            </div>
            <input id = "Addcandidate" type = "text"></input>
            <div>
            <button className='myButton' onClick = {() => addCandidate(document.getElementById('Addcandidate').value)}>Add Candidate</button>
            <button onClick = {() => getNoOfCandidates()}>Get No of Candidates</button>
            <button onClick = {() => getCandidates()}>Get Candidates</button>
            </div>
            <div>{`Total number of candidates are ${noOfCandidates}`}</div>
            <div>
              Candidates are:
            {candidates.map((candidate, index) => {
              return <div key = {index}>{candidate}</div>
            })}
            </div>
            <input id = "Votecandidate" type = "text"></input>
            <div>
            <button className='myButton' onClick = {() => voteForCandidate(document.getElementById('Votecandidate').value)}>Vote for Candidate</button>
            <button onClick = {() => getWinner()}>Get Winner</button>
            <button onClick = {() => calculateWinner()}>Calculate Winner</button>
            </div>
            <div>{winner}</div>
            <button onClick = {() => reset()}>Reset</button>
        </div>
    )
}
