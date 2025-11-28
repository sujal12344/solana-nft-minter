import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useProgram } from "@thirdweb-dev/react/solana";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = () => {
  // Here's how to get the thirdweb SDK instance
  // const sdk = useSDK();
  // Here's how to get a nft collection
  // const { program } = useProgram(
  //   your_nft_collection_address,
  //   "nft-collection"
  // );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File>();

  const wallet = useWallet().publicKey;
  const isConnected = !!wallet;

  const { program, isLoading } = useProgram(
    "E2EvrNbhCGW4zDCYkbnidZE7HQedzKWpyeQZpXxaxuSH",
    "nft-collection"
  );

  const mintNft = async () => {
    try {
      if (isLoading) return;

      const mint = await program.mint({
        name,
        description,
        image: file,
      });

      alert(`NFT minted successfully - ${mint}`);
    } catch (err) {
      console.error(err);
      alert("Error minting NFT!");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <Image
            src="/thirdweb.svg"
            alt="Thirdweb"
            className={styles.icon}
            width={80}
            height={80}
          />
          <Image
            src="/sol.png"
            alt="Solana"
            className={styles.icon}
            width={80}
            height={80}
          />
        </div>
        <h1 className={styles.h1}>Solana, meet thirdweb 👋</h1>
        <p className={styles.explain}>
          Explore what you can do with thirdweb&rsquo;s brand new{" "}
          <b>
            <a
              href="https://portal.thirdweb.com/solana"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.lightPurple}
            >
              Solana SDK
            </a>
          </b>
          . Create and mint NFTs on the Solana blockchain with ease.
        </p>

        {!isConnected && (
          <div className={styles.connectPrompt}>
            <p>🔗 Connect your Solana wallet to start minting NFTs</p>
          </div>
        )}

        {isConnected && (
          <>
            <div className={styles.statusConnected}>
              <span className={styles.statusDot}></span>
              Wallet Connected Successfully!
            </div>
            <div className={styles.formContainer}>
              <h2
                style={{ marginTop: 0, marginBottom: "24px", color: "#e2e8f0" }}
              >
                Mint Your NFT
              </h2>

              <div className={styles.inputGroup}>
                <label className={styles.label}>NFT Name</label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Enter NFT name..."
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Description</label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="Describe your NFT..."
                  className={`${styles.input} ${styles.textarea}`}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Upload Image</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files![0])}
                  className={`${styles.input} ${styles.fileInput}`}
                  accept="image/*"
                />
              </div>

              <button
                onClick={mintNft}
                className={styles.mintButton}
                disabled={!name || !description || !file || isLoading}
              >
                {isLoading ? "⏳ Minting..." : "✨ Mint NFT"}
              </button>
            </div>
          </>
        )}

        <div className={styles.walletSection}>
          <WalletMultiButton />
        </div>
      </div>
    </>
  );
};

export default Home;
