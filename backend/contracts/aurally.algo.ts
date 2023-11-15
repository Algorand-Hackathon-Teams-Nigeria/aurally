import { Contract } from '@algorandfoundation/tealscript';

type AurallyCreative = {
  creative_type: string;
  minted: uint64;
  fullname: string;
  username: string;
  dNft: Asset;
};

type SoundNFT = {
  AssetName: uint64;
  supply: uint64;
  title: string;
  label: string;
  artist: string;
  releaseDate: uint64;
  genre: string;
  price: uint64;
  coverImageIpfs: string;
  audioSampleIpfs: string;
  fullTrackIpfs: string;
  owner: Address;
  forSale: boolean;
};

type ArtNFT = {
  title: string;
  AssetName: uint64;
  name: string;
  supply: uint64;
  description: string;
  ipfslocation: string;
  price: uint64;
  soldPrice: uint64;
  owner: Address;
  forSale: boolean;
};

type Proposal = {
  proposalHash: uint64;
  yesVotes: uint64;
  noVotes: uint64;
  details: string;
};

type AuctionItem = {
  nftHash: string;
  nftName: string;
  minBid: uint64;
  highestBid: uint64;
  highestBidder: Address;
  isAuctionActive: boolean;
};

// eslint-disable-next-line no-unused-vars
class Aurally extends Contract {
  aurallyToken = GlobalStateKey<Asset>();

  dnftH = GlobalStateKey<Asset>();

  aurallyNFTOwner = BoxMap<Address, AurallyCreative>({ prefix: 'nftOwner' });

  aurallyStreamEarnings = BoxMap<Address, uint64>({ prefix: 'streamEarnings' });

  aurallyDaoProposals = BoxMap<uint64, Proposal>({ prefix: 'proposals' });

  soundNFTs = BoxMap<string, SoundNFT>({ prefix: 'soundNFT' });

  artNFTs = BoxMap<string, ArtNFT>({ prefix: 'artNFT' });

  usedIpfsHashes = BoxMap<string, boolean>({ prefix: 'ipfsHashes' });

  artAuctions = BoxMap<string, AuctionItem>();

  createApplication(): void {
    this.aurallyToken.value = Asset.zeroIndex;
  }

  private pay(receiver: Account, amount: uint64): void {
    assert(amount > 0);
    sendPayment({
      receiver: receiver,
      amount: amount,
    });
  }

  // Create a new Sound NFT
  createSoundNFT(
    creator: Account,
    nft: string,
    _fullname: string,
    _username: string,
    supply: uint64,
    title: string,
    label: string,
    artist: string,
    genre: string,
    price: uint64,
    releaseDate: uint64,
    coverImageIpfs: string,
    audioSampleIpfs: string
  ): boolean {
    // Check if the creator is already registered
    if (!this.aurallyNFTOwner(this.txn.sender).exists) {
      // Register the creator and create a D-NFT for them
      const dNft = sendAssetCreation({
        configAssetTotal: 1, // D-NFTs are typically unique
        configAssetName: rawBytes(creator.authAddr),
        configAssetManager: this.app.address, // The contract itself manages the D-NFT
      });

      // Add the creator to the aurallyNFTOwner with their D-NFT
      this.aurallyNFTOwner(this.txn.sender).value = {
        creative_type: 'music', // or 'art', based on context
        minted: 0,
        fullname: _fullname,
        username: _username,
        dNft: dNft,
      };

      this.dnftH.value = dNft;
    }
    // Ensure that the creator is a registered music artist
    assert(this.aurallyNFTOwner(this.txn.sender).value.creative_type === 'music');
    assert(!this.soundNFTs(nft).exists);

    // Check if the IPFS hash for the full track is already used
    assert(!this.usedIpfsHashes(nft).exists);

    // Logic to create and store the Sound
    const soundnft = sendAssetCreation({
      configAssetTotal: supply,
      configAssetMetadataHash: nft,
      configAssetURL: 'https://ipfs.io/ipfs/' + nft,
      configAssetName: nft,
    });

    this.soundNFTs(nft).value = {
      AssetName: soundnft.id,
      title: title,
      label: label,
      artist: artist,
      releaseDate: releaseDate,
      genre: genre,
      price: price,
      coverImageIpfs: coverImageIpfs,
      audioSampleIpfs: audioSampleIpfs,
      fullTrackIpfs: nft,
      owner: this.txn.sender,
      supply: supply,
      forSale: true,
    };

    this.usedIpfsHashes(nft).value = true;

    // Increment the minted NFT count for the creator
    const creatorData = this.aurallyNFTOwner(creator.authAddr).value;
    const incr = creatorData.minted + 1;
    this.aurallyNFTOwner(this.txn.sender).value = {
      creative_type: 'music', // or 'art', based on context
      minted: incr,
      fullname: _fullname,
      username: _username,
      dNft: this.dnftH.value,
    };

    return true;
  }

  // Create a new Art NFT
  createArtNFT(creator: Account, nft: ArtNFT, _fullname: string, _username: string): boolean {
    // Check if the creator is already registered
    if (!this.aurallyNFTOwner(this.txn.sender).exists) {
      // Register the creator and create a D-NFT for them
      const dNft = sendAssetCreation({
        configAssetTotal: 1, // D-NFTs are typically unique
        configAssetName: rawBytes(creator.authAddr),
        configAssetManager: this.app.address, // The contract itself manages the D-NFT
      });

      // Add the creator to the aurallyNFTOwner with their D-NFT
      this.aurallyNFTOwner(creator.authAddr).value = {
        creative_type: 'art',
        minted: 0,
        fullname: _fullname,
        username: _username,
        dNft: dNft,
      };
    }
    // Ensure that the creator is a registered artist
    assert(this.aurallyNFTOwner(creator.authAddr).value.creative_type === 'art');
    assert(!this.aurallyNFTOwner(creator.authAddr).exists);
    assert(!this.soundNFTs(nft.ipfslocation).exists);
    // Logic to create and store the Art NFT
    const artnft = sendAssetCreation({
      configAssetTotal: nft.supply,
      configAssetMetadataHash: nft.ipfslocation,
      configAssetURL: 'https://ipfs.io/ipfs/' + nft.ipfslocation,
      configAssetName: nft.ipfslocation,
    });

    this.artNFTs(nft.ipfslocation).value = {
      AssetName: artnft.id,
      title: nft.title,
      name: nft.name,
      supply: nft.supply,
      description: nft.description,
      ipfslocation: nft.ipfslocation,
      price: nft.price, // Initial bid price
      soldPrice: 0, // Initial sold price
      owner: creator.authAddr, // NFT initially owned by creator
      forSale: true, // Listed for sale by default
    };

    // Start the auction for the art NFT
    this.artAuctions(nft.ipfslocation).value = {
      nftHash: nft.ipfslocation,
      nftName: nft.name,
      minBid: nft.price,
      highestBid: 0,
      highestBidder: globals.zeroAddress,
      isAuctionActive: true,
    };

    // Increment the minted NFT count for the creator
    const creatorData = this.aurallyNFTOwner(creator.authAddr).value;
    const incr = creatorData.minted + 1;
    this.aurallyNFTOwner(this.txn.sender).value = {
      creative_type: 'art', // or 'art', based on context
      minted: incr,
      fullname: _fullname,
      username: _username,
      dNft: this.dnftH.value,
    };
    return true;
  }

  startAuction(nftIpfs: string, nftName: string, minBid: uint64): void {
    // Logic to start the auction
    // Set initial auction data
    this.artAuctions(nftIpfs).value = {
      nftHash: nftIpfs,
      nftName: nftName,
      minBid: minBid,
      highestBid: 0,
      highestBidder: globals.zeroAddress,
      isAuctionActive: true,
    };
  }

  bidOnArtAuction(bidder: Account, nftIpfs: string, bidAmount: uint64): void {
    const auctionExists = this.artAuctions(nftIpfs).exists;
    assert(auctionExists);

    if (auctionExists) {
      const auction = this.artAuctions(nftIpfs).value;
      // const isAuctionActive = auction.isAuctionActive;
      // assert(isAuctionActive);
      assert(bidAmount > auction.highestBid);

      // Record the new highest bid and bidder
      auction.highestBid = bidAmount;
      auction.highestBidder = bidder.authAddr;
      this.artAuctions(nftIpfs).value = auction;
    }
  }

  endArtAuction(seller: Account, nftIpfs: string): void {
    const auction = this.artAuctions(nftIpfs).value;
    assert(this.artAuctions(nftIpfs).exists);
    assert(this.artNFTs(nftIpfs).value.owner === seller.authAddr);
    // assert(auction.isAuctionActive);

    // Transfer NFT ownership to the highest bidder
    const nft = this.artNFTs(nftIpfs).value;
    nft.owner = auction.highestBidder;
    this.artNFTs(nftIpfs).value.owner = nft.owner;

    // Mark the auction as inactive
    // auction.isAuctionActive = false;
    // this.artAuctions(nftIpfs).value.isAuctionActive = auction.isAuctionActive;
  }

  // // Purchase an NFT
  purchaseNFT(buyer: Account, nftIpfs: string, isSoundNFT: boolean): boolean {
    if (isSoundNFT ? this.soundNFTs(nftIpfs).exists : this.artNFTs(nftIpfs).exists) {
      this.soundNFTs(nftIpfs).value.owner = buyer.authAddr;
      // Ensure the NFT is not already owned by the buyer
      assert(this.soundNFTs(nftIpfs).value.owner !== buyer.authAddr);

      this.pay(this.soundNFTs(nftIpfs).value.owner, this.soundNFTs(nftIpfs).value.price);
    } else {
      this.artNFTs(nftIpfs).value.owner = buyer.authAddr;
      // Ensure the NFT is not already owned by the buyer
      assert(this.artNFTs(nftIpfs).value.owner !== buyer.authAddr);

      this.pay(this.artNFTs(nftIpfs).value.owner, this.soundNFTs(nftIpfs).value.price);
    }

    return true;
  }

  // // Transfer an NFT
  transferNFT(sender: Account, receiver: Address, nftIpfs: string, isSoundNFT: boolean): boolean {
    // Transfer ownership of NFT
    if (isSoundNFT ? this.soundNFTs(nftIpfs).exists : this.artNFTs(nftIpfs).exists) {
      this.soundNFTs(nftIpfs).value.owner = receiver.authAddr;
    } else {
      this.artNFTs(nftIpfs).value.owner = receiver.authAddr;
    }

    return true;
  }

  // // Voting logic
  voteOnProposal(voter: Account, vote: boolean, propID: uint64): boolean {
    // Use the 'vote' parameter in the function body
    const proposalExists = this.aurallyDaoProposals(propID).exists;
    assert(proposalExists);

    if (vote === true) {
      const a = this.aurallyDaoProposals(propID).value.yesVotes;
      this.aurallyDaoProposals(propID).value.yesVotes = a + 1;
    } else {
      const b = this.aurallyDaoProposals(propID).value.noVotes;
      this.aurallyDaoProposals(propID).value.yesVotes = b + 1;
    }

    return true;
  }

  createProposal(creator: Account, proposalDetails: string, id: uint64): boolean {
    // Logic to ensure only registered users can create a proposal
    assert(this.aurallyNFTOwner(creator.authAddr).exists);

    // Create a new proposal and add it to the DAO proposals
    this.aurallyDaoProposals(id).value = {
      proposalHash: id + 1,
      yesVotes: 0,
      noVotes: 0,
      details: proposalDetails, // Optionally store proposal details
    };
    return true;
  }

  // // Record a stream and award an Aura token
  streamNFT(owner: Address, ipfslocation: string): boolean {
    const nft = this.soundNFTs(ipfslocation).value;
    assert(this.soundNFTs(ipfslocation).exists);
    assert(nft.owner === owner);

    // Increment the Aura token count for the owner
    const currentEarnings = this.aurallyStreamEarnings(owner).value || 0;
    this.aurallyStreamEarnings(owner).value = currentEarnings + 1;
    return true;
  }

  private getAccountBalance(accountAddress: Address): uint64 {
    // Implement the logic to get the account balance.
    return this.aurallyStreamEarnings(accountAddress.authAddr).value || 0;
  }

  optInToAsset(user: Account, asset: Asset): boolean {
    // Submit opt-in transaction for the user to the specified asset
    sendAssetTransfer({
      assetReceiver: user.authAddr,
      xferAsset: asset,
      assetAmount: 0,
    });
    return true;
  }
}
