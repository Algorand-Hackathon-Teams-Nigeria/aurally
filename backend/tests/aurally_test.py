from datetime import datetime, timedelta
import os
from pathlib import Path
from typing import List, Tuple
from algosdk import atomic_transaction_composer, encoding, transaction
from beaker import localnet
from beaker.client import ApplicationClient
from beaker.consts import algo
from beaker.localnet.kmd import LocalAccount
import pytest
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
def test_account(test_accounts: List[LocalAccount]) -> LocalAccount:
    return test_accounts.pop()


@pytest.fixture(scope="session")
def auction_key() -> str:
    return f"The Auction _ {datetime.utcnow()}"


@pytest.fixture(scope="session")
def aura_token(aurally_client: ApplicationClient) -> int:
    result = aurally_client.call(
        aurally_contract.create_aura_tokens,
        boxes=[(aurally_client.app_id, "aura".encode())],
    )
    assert list(result.return_value)[1] == "aura"
    return list(result.return_value)[0]


def test_says_hello(aurally_client: ApplicationClient) -> None:
    result = aurally_client.call(aurally_contract.hello, name="Hello")
    assert result.return_value == "Hello World"


def test_register_creator(
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
    algod_client: AlgodClient,
    aura_token: int,
) -> None:
    sp = algod_client.suggested_params()

    opt_txn = transaction.AssetOptInTxn(
        sp=sp, sender=test_account.address, index=aura_token
    )

    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=opt_txn, signer=test_account.signer
    )
    result = aurally_client.call(
        aurally_contract.register_creator,
        txn=txn,
        fullname="Dev Ready",
        username="Dev2700",
        boxes=[
            (aurally_client.app_id, encoding.decode_address(txn.txn.sender)),
            (aurally_client.app_id, "aura".encode()),
        ],
    )
    assert list(result.return_value)[3] == "Dev Ready"


@pytest.fixture(scope="session")
def test_create_sound_nft(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
    aura_token: int,
) -> Tuple[str, int]:
    asset_key = f"Dev Stockins_{datetime.utcnow()}"

    nft_name = "Dev Stockins"
    sp = algod_client.suggested_params()
    raw_txn = transaction.PaymentTxn(
        sender=test_account.address, receiver=test_account.address, amt=0, sp=sp
    )
    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    result = aurally_client.call(
        aurally_contract.create_sound_nft,
        txn=txn,
        nft_name=nft_name,
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
        aura_asset=aura_token,
        creator=test_account.address,
        supply=20,
        for_sale=False,
        boxes=[
            (aurally_client.app_id, asset_key.encode()),
            (aurally_client.app_id, "aura".encode()),
            (aurally_client.app_id, encoding.decode_address(txn.txn.sender)),
        ],
    )
    assert list(result.return_value)[2] == "Dev Tokens"
    return (asset_key, result.return_value[0])


# @pytest.mark.skip
def test_create_art_nft(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
    aura_token: int,
):
    supply = 20
    nft_name = "Sun God Nika"
    sp = algod_client.suggested_params()
    url = "https://ipfs.io/ipfs/" + nft_name

    raw_txn = transaction.PaymentTxn(
        sender=test_account.address, receiver=test_account.address, amt=0, sp=sp
    )

    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    result = aurally_client.call(
        aurally_contract.create_art_nft,
        txn=txn,
        title=nft_name,
        nft_name=nft_name,
        name=nft_name,
        supply=supply,
        description="Gear 5 Luffy",
        ipfs_location=url,
        price=2000,
        for_sale=True,
        aura_asset=aura_token,
        creator=test_account.address,
        boxes=[
            (aurally_client.app_id, url.encode()),
            (aurally_client.app_id, "aura".encode()),
            (aurally_client.app_id, encoding.decode_address(txn.txn.sender)),
        ],
    )

    assert list(result.return_value)[1] == nft_name


# @pytest.mark.skip
def test_create_art_auction(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
    auction_key: str,
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

    starts_at = datetime.now() - timedelta(weeks=2)
    ends_at = datetime.now() + timedelta(days=2)

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


# @pytest.mark.skip
def test_bid_on_auction(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
    auction_key: str,
):
    sp = algod_client.suggested_params()
    raw_txn = transaction.PaymentTxn(
        sender=test_account.address, sp=sp, receiver=test_account.address, amt=0
    )
    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    result = aurally_client.call(
        aurally_contract.bid_on_art_auction,
        txn=txn,
        auction_key=auction_key,
        bid_ammount=20000,
        boxes=[(aurally_client.app_id, auction_key.encode())],
    )

    assert list(result.return_value)[6] == 20000


# @pytest.mark.skip
def test_complete_art_auction(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
    auction_key: str,
):
    nft_name = "Sun God Nika"
    sp = algod_client.suggested_params()
    url = "https://ipfs.io/ipfs/" + nft_name
    raw_txn = transaction.PaymentTxn(
        sender=test_account.address, receiver=test_account.address, amt=0, sp=sp
    )

    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    result = aurally_client.call(
        aurally_contract.complete_art_auction,
        txn=txn,
        auction_key=auction_key,
        boxes=[
            (aurally_client.app_id, url.encode()),
            (aurally_client.app_id, auction_key.encode()),
        ],
    )

    assert list(result.return_value)[1] == nft_name


# @pytest.mark.skip
def test_purchase_nft(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
    test_accounts: List[LocalAccount],
    test_create_sound_nft: Tuple[str, int],
    aura_token: int,
):
    buyer_account = test_accounts[1]
    sp = algod_client.suggested_params()

    raw_txn = transaction.PaymentTxn(
        sender=buyer_account.address, receiver=aurally_client.app_addr, amt=20000, sp=sp
    )
    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=buyer_account.signer
    )

    optin_txn = transaction.AssetOptInTxn(
        sender=buyer_account.address, index=test_create_sound_nft[1], sp=sp
    )
    optin_txn = atomic_transaction_composer.TransactionWithSigner(
        txn=optin_txn, signer=buyer_account.signer
    )
    aura_optin_txn = transaction.AssetOptInTxn(
        sender=buyer_account.address, index=aura_token, sp=sp
    )
    aura_optin_txn = atomic_transaction_composer.TransactionWithSigner(
        txn=aura_optin_txn, signer=buyer_account.signer
    )

    aurally_client.call(
        aurally_contract.purchase_nft,
        txn=txn,
        asset_key=test_create_sound_nft[0],
        nft_type="sound",
        seller=test_account.address,
        optin_txn=optin_txn,
        buyer=buyer_account.address,
        aura_optin_txn=aura_optin_txn,
        sound_nft_id=test_create_sound_nft[1],
        aura_id=aura_token,
        boxes=[
            (aurally_client.app_id, "aura".encode()),
            (aurally_client.app_id, test_create_sound_nft[0].encode()),
        ],
    )


# @pytest.mark.skip
def test_transfer_nft(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_accounts: List[LocalAccount],
    test_account: LocalAccount,
    test_create_sound_nft: Tuple[str, int],
):
    sp = algod_client.suggested_params()
    raw_txn = transaction.PaymentTxn(
        sender=test_account.address, receiver=test_account.address, sp=sp, amt=0
    )
    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    aurally_client.call(
        aurally_contract.transfer_nft,
        txn=txn,
        to=test_accounts[1].address,
        asset_key=test_create_sound_nft[0],
        nft_type="sound",
        boxes=[(aurally_client.app_id, test_create_sound_nft[0].encode())],
    )


# @pytest.mark.skip
def test_create_proposal(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
):
    sp = algod_client.suggested_params()
    raw_txn = transaction.PaymentTxn(
        sender=test_account.address, receiver=test_account.address, sp=sp, amt=0
    )
    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    proposal_key = "Proposal to bring Gojo back"
    proposal_detail = """
            Gojo is the GOAT, and deserves to be brought back.
            But I also like Sukuna, so I have mixed feeligs
        """

    result = aurally_client.call(
        aurally_contract.create_proposal,
        txn=txn,
        proposal_key=proposal_key,
        proposal_detail=proposal_detail,
        boxes=[
            (aurally_client.app_id, proposal_key.encode()),
            (aurally_client.app_id, encoding.decode_address(test_account.address)),
        ],
    )

    assert list(result.return_value)[0] == proposal_key


# @pytest.mark.skip
def test_vote_on_proposal(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
    aura_token: int,
):
    sp = algod_client.suggested_params()
    raw_txn = transaction.PaymentTxn(
        sender=test_account.address, receiver=test_account.address, sp=sp, amt=0
    )
    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    proposal_key = "Proposal to bring Gojo back"

    result = aurally_client.call(
        aurally_contract.vote_on_proposal,
        txn=txn,
        vote_for=True,
        proposal_key=proposal_key,
        aura_id=aura_token,
        voter=test_account.address,
        boxes=[
            (aurally_client.app_id, "aura".encode()),
            (aurally_client.app_id, proposal_key.encode()),
            (aurally_client.app_id, encoding.decode_address(test_account.address)),
        ],
    )

    assert list(result.return_value)[1] > 0


def test_end_proposal_voting(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
):
    sp = algod_client.suggested_params()
    raw_txn = transaction.PaymentTxn(
        sender=test_account.address, receiver=test_account.address, sp=sp, amt=0
    )
    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    proposal_key = "Proposal to bring Gojo back"

    result = aurally_client.call(
        aurally_contract.end_proposal_voting,
        txn=txn,
        proposal_key=proposal_key,
        boxes=[
            (aurally_client.app_id, proposal_key.encode()),
            (aurally_client.app_id, encoding.decode_address(test_account.address)),
        ],
    )

    assert list(result.return_value)[0] == proposal_key


def test_unfreeze_auras(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_account: LocalAccount,
    aura_token: int,
):
    sp = algod_client.suggested_params()
    raw_txn = transaction.PaymentTxn(
        sender=test_account.address, receiver=test_account.address, sp=sp, amt=0
    )
    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    aurally_client.call(
        aurally_contract.unfreeze_auras,
        txn=txn,
        aura=aura_token,
        acc=test_account.address,
        boxes=[(aurally_client.app_id, "aura".encode())],
    )


def test_promote_to_admin(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_accounts: List[LocalAccount],
):
    test_account = test_accounts[0]
    sp = algod_client.suggested_params()
    raw_txn = transaction.PaymentTxn(
        sender=test_account.address, receiver=test_account.address, sp=sp, amt=0
    )
    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    result = aurally_client.call(
        aurally_contract.promote_to_admin,
        txn=txn,
        acc=test_account.address,
        boxes=[(aurally_client.app_id, encoding.decode_address(test_account.address))],
    )
    is_admin = result.return_value

    assert is_admin == "True"


def test_demote_from_admin(
    algod_client: AlgodClient,
    aurally_client: ApplicationClient,
    test_accounts: List[LocalAccount],
):
    test_account = test_accounts[0]
    sp = algod_client.suggested_params()
    raw_txn = transaction.PaymentTxn(
        sender=test_account.address, receiver=test_account.address, sp=sp, amt=0
    )
    txn = atomic_transaction_composer.TransactionWithSigner(
        txn=raw_txn, signer=test_account.signer
    )

    result = aurally_client.call(
        aurally_contract.demote_from_admin,
        txn=txn,
        acc=test_account.address,
        boxes=[(aurally_client.app_id, encoding.decode_address(test_account.address))],
    )
    is_admin = result.return_value

    assert is_admin == "False"
