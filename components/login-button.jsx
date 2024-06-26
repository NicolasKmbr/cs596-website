"use client";

import { Button } from "@/components/ui/button";
import createSession from "@/lib/actions/create-session";
import getSession from "@/lib/actions/get-session";
import SmartContractClient from "@/lib/web3/smart-contract-client";
import { useEffect, useState } from "react";

function LoginButton({ className }) {
  const connectWalletHandler = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts.length === 0) {
          console.error("No account found");
          return;
        }

        const address = accounts[0];

        const isRegisteredUniversity =
          await SmartContractClient().isRegisteredUniversity(address);

        await createSession(address, isRegisteredUniversity);
        redirectToAction();
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const redirectToAction = () => {
    window.location.href = "/action";
  };

  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      const [address, _] = await getSession();
      setAddress(address);
    };

    fetchAddress();
  }, []);

  if (address == null) {
    return (
      <Button className={className} onClick={connectWalletHandler}>
        Connect MetaMask Wallet
      </Button>
    );
  }

  return (
    <Button className={className} onClick={redirectToAction}>
      Go to your actions
    </Button>
  );
}

export default LoginButton;
