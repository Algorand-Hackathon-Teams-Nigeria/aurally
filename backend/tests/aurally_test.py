from datetime import datetime, timedelta
import os
from pathlib import Path
from typing import List
from algosdk import atomic_transaction_composer, encoding, transaction
from beaker import localnet
from beaker.client import ApplicationClient
from beaker.consts import algo
from beaker.localnet.kmd import LocalAccount
import pytest
import hashlib
from algosdk.v2client.algod import AlgodClient

from smart_contracts.aurally import contract as aurally_contract


@pytest.fixture(scope="session")
def test_accounts() -> List[LocalAccount]:
    return localnet.kmd.get_accounts()


@pytest.fixture(scope="session")
def aurally_client(test_accounts: List[LocalAccount]) -> ApplicationClient:
    artifacts_dir = (
        Path(__file__)
        .resolve()
        .parent.parent.joinpath("smart_contracts")
        .joinpath("artifacts")
        .joinpath("Aurally")
    )
    if not artifacts_dir.is_dir():
        os.makedirs(artifacts_dir, exist_ok=True)
    aurally_contract.app.build().export(artifacts_dir)

    app_account = test_accounts[0]

    client = ApplicationClient(
        app=aurally_contract.app,
        signer=app_account.signer,
        sender=app_account.address,
        client=localnet.get_algod_client(),
    )
    client.create()
    client.fund(2 * algo)
    return client


@pytest.fixture(scope="session")
def test_account() -> LocalAccount:
    return localnet.get_accounts().pop()


def test_says_hello(aurally_client: ApplicationClient) -> None:
    result = aurally_client.call(aurally_contract.hello, name="World")

    assert result.return_value == "Hello, World"


def test_register_creator(
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
    algod_client: AlgodClient,
) -> None:
    sp = algod_client.suggested_params()
    txn = transaction.AssetConfigTxn(
        sp=sp,
        total=1,
        sender=test_account.address,
        strict_empty_address_check=False,
        manager=aurally_client.app_addr,
        asset_name=test_account.address[:7],
    )
    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=txn, signer=test_account.signer
    )
    result = aurally_client.call(
        aurally_contract.register_creator,
        txn=txn,
        fullname="Dev Ready",
        username="Dev2700",
        boxes=[(aurally_client.app_id, encoding.decode_address(txn.txn.sender))],
    )
    assert list(result.return_value)[3] == "Dev Ready"


def test_create_sound_nft(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
):
    supply = 20
    nft_name = "Dev Stockins"
    sp = algod_client.suggested_params()
    raw_txn = transaction.AssetCreateTxn(
        sp=sp,
        decimals=2,
        total=supply,
        unit_name="DST",
        asset_name=nft_name,
        default_frozen=False,
        metadata_hash=generate_hash(nft_name),
        sender=test_account.address,
        url="https://ipfs.io/ipfs/" + nft_name,
    )
    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    asset_key = f"{nft_name}_{datetime.utcnow()}"

    result = aurally_client.call(
        aurally_contract.create_sound_nft,
        txn=txn,
        asset_key=asset_key,
        title="Dev Tokens",
        label="Dev Reccords",
        artist="GigaChad",
        release_date="200023021",
        genre="Pop",
        price=20000,
        cover_image_ipfs="some_id",
        audio_sample_ipfs="some_other_id",
        full_track_ipfs="yet_another_id",
        supply=20,
        for_sale=False,
        boxes=[
            (aurally_client.app_id, asset_key.encode()),
            (aurally_client.app_id, encoding.decode_address(txn.txn.sender)),
        ],
    )
    assert list(result.return_value)[2] == "Dev Tokens"


def test_create_art_nft(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
):
    supply = 20
    nft_name = "Sun God Nika"
    sp = algod_client.suggested_params()
    url = "https://ipfs.io/ipfs/" + nft_name

    raw_txn = transaction.AssetCreateTxn(
        sp=sp,
        decimals=2,
        total=supply,
        unit_name="DST",
        asset_name=nft_name,
        default_frozen=False,
        metadata_hash=generate_hash(nft_name),
        sender=test_account.address,
        url=url,
    )

    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    result = aurally_client.call(
        aurally_contract.create_art_nft,
        txn=txn,
        title=nft_name,
        name=nft_name,
        supply=supply,
        description="Gear 5 Luffy",
        ipfs_location=url,
        price=2000,
        for_sale=True,
        boxes=[
            (aurally_client.app_id, url.encode()),
            (aurally_client.app_id, encoding.decode_address(txn.txn.sender)),
        ],
    )

    assert list(result.return_value)[1] == nft_name


def test_create_art_auction(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
):
    nft_name = "Sun God Nika"
    sp = algod_client.suggested_params()
    url = "https://ipfs.io/ipfs/" + nft_name
    raw_txn = transaction.PaymentTxn(
        sender=test_account.address, sp=sp, receiver=test_account.address, amt=0
    )
    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    auction_key = f"The Auction _ {datetime.utcnow()}"
    starts_at = datetime.now() + timedelta(days=1)
    ends_at = starts_at + timedelta(days=1)

    result = aurally_client.call(
        aurally_contract.create_art_auction,
        txn=txn,
        auction_key=auction_key,
        ipfs_location=url,
        min_bid=10000,
        starts_at=int(starts_at.timestamp()),
        ends_at=int(ends_at.timestamp()),
        boxes=[
            (aurally_client.app_id, url.encode()),
            (aurally_client.app_id, auction_key.encode()),
            (aurally_client.app_id, encoding.decode_address(txn.txn.sender)),
        ],
    )

    assert list(result.return_value)[1] == url


def generate_hash(input_str: str) -> bytes:
    input_bytes = input_str.encode("utf-8")
    sha256_hash = hashlib.sha256()
    sha256_hash.update(input_bytes)
    hash_bytes = bytes.fromhex(sha256_hash.hexdigest())
    return hash_bytes[:32]